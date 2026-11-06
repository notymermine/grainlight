
import { GoogleGenAI } from "@google/genai";
import { PROMPTS, SCHEMAS } from '../constants';
import type { FeedbackData, AppModule } from '../types';

// Helper function to sample frames from a video file for analysis
const sampleFramesFromVideo = (file: File, frameCount: number = 15, onProgress: (progress: number) => void): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const frames: string[] = [];
    const objectUrl = URL.createObjectURL(file);

    video.preload = 'metadata';
    video.src = objectUrl;

    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const duration = video.duration;
      const interval = duration / frameCount;
      let currentTime = 0;
      let framesCaptured = 0;

      const captureFrame = () => {
        if (!context) {
          URL.revokeObjectURL(objectUrl);
          return reject(new Error("Could not get canvas context."));
        }
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
        frames.push(dataUrl);
        framesCaptured++;
        const progress = Math.round((framesCaptured / frameCount) * 80);
        onProgress(progress);

        if (framesCaptured < frameCount) {
          currentTime += interval;
          video.currentTime = Math.min(currentTime, duration);
        } else {
          URL.revokeObjectURL(objectUrl);
          resolve(frames);
        }
      };
      video.onseeked = captureFrame;
      video.currentTime = 0;
    };
    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Error loading video file."));
    }
  });
};

/**
 * 视频分析（智绘课堂）
 * 强制使用 gemini-3-pro-preview 以获得更好的推理能力和在地化理解
 */
export const analyzeVideo = async (videoFile: File, onProgress: (progress: number) => void): Promise<FeedbackData> => {
  const frames = await sampleFramesFromVideo(videoFile, 15, onProgress);
  const frameParts = frames.map(base64Data => ({
    inlineData: { mimeType: 'image/jpeg', data: base64Data },
  }));
  onProgress(85);
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: { parts: [...frameParts, { text: PROMPTS.video }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: SCHEMAS.video,
      temperature: 0.1, // 降低随机性，保证客观观察
    }
  });
  onProgress(100);
  return JSON.parse(response.text.trim());
};

/**
 * 通用文本教学支持分析
 * 强制使用 gemini-3-pro-preview
 */
export const generateSupport = async (module: AppModule, input: string): Promise<any> => {
  const modelName = 'gemini-3-pro-preview';
  const targetModule = module === 'success' ? 'layered' : module;
  const prompt = `${PROMPTS[targetModule as keyof typeof PROMPTS]}\n\n教师输入的背景内容：\n${input}`;
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: SCHEMAS[targetModule as keyof typeof SCHEMAS],
      temperature: 0.3,
    }
  });
  return JSON.parse(response.text.trim());
};
