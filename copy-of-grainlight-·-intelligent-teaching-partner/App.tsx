
import React, { useState, useCallback, useEffect } from 'react';
import { ModuleSwitcher } from './components/ModuleSwitcher';
import { VideoUploader } from './components/VideoUploader';
import { TextModuleInput } from './components/TextModuleInput';
import { ResultDisplay } from './components/ResultDisplay';
import { analyzeVideo, generateSupport } from './services/geminiService';
import { AppModule } from './types';
import { APP_TITLE, APP_SUBTITLE, APP_SUBTITLE_EN, GULI_PROJECT_INTRO, LOADING_MESSAGES, FEEDBACK_SECTION_TITLES, MODULE_DESCRIPTIONS } from './constants';
import { InfoIcon } from './components/Icons';

// Global titles for sub-components
(window as any).FEEDBACK_TITLES = FEEDBACK_SECTION_TITLES;

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AppModule>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [results, setResults] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  useEffect(() => {
    if (!isLoading) return;
    setLoadingMessage(LOADING_MESSAGES[0]);
    const interval = setInterval(() => {
      setLoadingMessage(prev => {
        const idx = LOADING_MESSAGES.indexOf(prev);
        return LOADING_MESSAGES[(idx + 1) % LOADING_MESSAGES.length];
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleVideoAnalysis = useCallback(async () => {
    if (!videoFile) return;
    setIsLoading(true);
    setError(null);
    setProgress(0);
    try {
      const res = await analyzeVideo(videoFile, setProgress);
      setResults(prev => ({ ...prev, video: res }));
    } catch (e: any) {
      setError(e.message || 'Analysis failed');
    } finally {
      setIsLoading(false);
    }
  }, [videoFile]);

  const handleTextSubmit = useCallback(async (input: string) => {
    setIsLoading(true);
    setError(null);
    setProgress(30);
    try {
      const res = await generateSupport(activeModule, input);
      setResults(prev => ({ ...prev, [activeModule]: res }));
      setProgress(100);
    } catch (e: any) {
      setError(e.message || 'Generation failed');
    } finally {
      setIsLoading(false);
    }
  }, [activeModule]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-yellow-light/30 via-brand-beige/20 to-brand-green-light/30 text-brand-text font-sans flex flex-col items-center">
      <header className="w-full pt-12 pb-6 text-center container max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-green-dark tracking-tight">{APP_TITLE}</h1>
        <div className="mt-4">
          <p className="text-xl md:text-2xl font-medium text-brand-text/90 tracking-wide">{APP_SUBTITLE}</p>
          <p className="text-xs md:text-sm text-brand-text/40 font-mono uppercase tracking-[0.3em] mt-2">{APP_SUBTITLE_EN}</p>
        </div>
      </header>

      {/* GOG Project Context Section */}
      <section className="w-full max-w-4xl px-6 mb-12 animate-fade-in">
        <div className="bg-white/50 backdrop-blur-md p-6 md:p-10 rounded-[2rem] border border-white shadow-xl shadow-brand-green/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="flex items-center mb-6 space-x-3">
            <div className="h-[1px] flex-grow bg-brand-green/20"></div>
            <span className="text-[10px] font-black text-brand-green/60 tracking-[0.5em] uppercase px-4 whitespace-nowrap">Mission & Vision</span>
            <div className="h-[1px] flex-grow bg-brand-green/20"></div>
          </div>
          <div className="text-sm md:text-[15px] text-brand-text/80 leading-relaxed whitespace-pre-wrap text-justify font-normal space-y-4">
            {GULI_PROJECT_INTRO}
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl px-4 md:px-8">
        <ModuleSwitcher activeModule={activeModule} onSwitch={setActiveModule} />
        
        {/* Module Focus Description Card */}
        <div className="mb-8 p-5 bg-white/70 backdrop-blur-sm rounded-2xl border-l-[6px] border-brand-green shadow-sm flex items-start transform hover:scale-[1.01] transition-transform">
          <InfoIcon className="w-6 h-6 text-brand-green mt-0.5 mr-4 shrink-0" />
          <p className="text-[13px] md:text-sm leading-relaxed text-brand-text/90 italic font-medium">
            {MODULE_DESCRIPTIONS[activeModule]}
          </p>
        </div>
      </div>

      <main className="w-full max-w-7xl flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-450px)] min-h-[550px]">
          <div className="h-full">
            {activeModule === 'video' ? (
              <div className="flex flex-col h-full space-y-4">
                <VideoUploader
                  onFileSelect={setVideoFile}
                  onAnalyze={handleVideoAnalysis}
                  isLoading={isLoading}
                  videoFile={videoFile}
                />
                <TextModuleInput
                  module="video"
                  onSubmit={handleTextSubmit}
                  isLoading={isLoading}
                  compact={true}
                />
              </div>
            ) : (
              <TextModuleInput
                module={activeModule}
                onSubmit={handleTextSubmit}
                isLoading={isLoading}
              />
            )}
          </div>
          <div className="h-full">
            <ResultDisplay
              module={activeModule}
              data={results[activeModule]}
              isLoading={isLoading}
              error={error}
              progress={progress}
              loadingMessage={loadingMessage}
            />
          </div>
        </div>
      </main>

      <footer className="w-full p-10 text-center text-brand-text/40 text-[10px] md:text-xs border-t border-brand-green/5 mt-16 bg-white/20">
        <div className="max-w-4xl mx-auto">
          <p className="font-bold tracking-[0.4em] uppercase mb-2 text-brand-green/50">Grain of Growth Project · GrainLight</p>
          <p>Always together, growing together | Focused on Xiangxi Region Support · Supports Real Classrooms 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default App;