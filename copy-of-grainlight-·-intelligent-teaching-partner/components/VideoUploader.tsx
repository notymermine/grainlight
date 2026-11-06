
import React, { useState, useRef, useCallback } from 'react';
import { UPLOAD_PROMPT, UPLOAD_BUTTON_TEXT, ANALYZE_BUTTON_TEXT } from '../constants';
import { UploadIcon, FilmIcon } from './Icons';

interface VideoUploaderProps {
  onFileSelect: (file: File | null) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  videoFile: File | null;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileSelect, onAnalyze, isLoading, videoFile }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileValidation = (file: File) => {
    if (!file.type.startsWith('video/')) {
      alert('Please upload a valid video file.');
      return;
    }
    onFileSelect(file);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileValidation(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileValidation(e.target.files[0]);
    }
  };
  
  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }


  return (
    <div className="flex flex-col h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300 transform hover:-translate-y-1">
      <div 
        className={`flex-grow flex flex-col justify-center items-center text-center border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${isDragging ? 'border-brand-green bg-brand-green-light scale-105 shadow-inner' : 'border-gray-300/80'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
        {videoFile ? (
          <div className="text-brand-text">
            <FilmIcon className="w-16 h-16 mx-auto text-brand-green" />
            <p className="mt-4 font-semibold text-lg">{videoFile.name}</p>
            <p className="text-sm text-gray-500">{formatFileSize(videoFile.size)}</p>
            <button
                onClick={() => onFileSelect(null)}
                className="mt-4 text-sm text-red-500 hover:underline"
            >
                Remove Video
            </button>
          </div>
        ) : (
          <div className="text-brand-text/70">
            <UploadIcon className="w-16 h-16 mx-auto text-gray-400" />
            <p className="mt-4 text-lg">{UPLOAD_PROMPT}</p>
            <p className="mt-1 text-sm">OR</p>
            <button
              onClick={handleSelectFileClick}
              className="mt-2 font-semibold text-brand-green hover:text-brand-green-dark transition-colors"
            >
              Click here to select a file
            </button>
          </div>
        )}
      </div>
      <div className="mt-6">
        <button
          onClick={onAnalyze}
          disabled={!videoFile || isLoading}
          className="w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-brand-green-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center"
        >
          {ANALYZE_BUTTON_TEXT}
        </button>
      </div>
    </div>
  );
};
