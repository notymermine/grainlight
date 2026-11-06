
import React from 'react';
import { FeedbackData, StudentStatusResult, LayeredSupportResult, SuccessExperienceResult, EfficiencyToolsResult, AppModule } from '../types';
import { SpinnerIcon, LightbulbIcon, CheckCircleIcon, InfoIcon } from './Icons';

interface ResultDisplayProps {
  module: AppModule;
  data: any;
  isLoading: boolean;
  error: string | null;
  progress: number;
  loadingMessage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ module, data, isLoading, error, progress, loadingMessage }) => {
  if (isLoading) {
    return (
      <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center">
        <SpinnerIcon className="w-12 h-12 text-brand-green" />
        <h3 className="mt-4 text-xl font-semibold">{loadingMessage || 'Thinking...'}</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5 my-4 max-w-xs">
          <div className="bg-brand-green h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-center text-red-500">
        <InfoIcon className="w-12 h-12 mb-4" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full border-2 border-dashed border-gray-300/50 rounded-2xl flex items-center justify-center text-brand-text/40">
        <p>Assistant's suggestions will appear here after generation</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 overflow-y-auto">
      {module === 'student' && <StudentRender data={data} />}
      {module === 'layered' && <LayeredRender data={data} />}
      {module === 'success' && <SuccessRender data={data} />}
      {module === 'tools' && <ToolsRender data={data} />}
      {module === 'video' && <VideoFeedbackRender data={data} />}
    </div>
  );
};

const StudentRender: React.FC<{ data: StudentStatusResult }> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-brand-green-dark">Observation Points</h3>
    <div className="space-y-4">
      {data.observations.map((obs, i) => (
        <div key={i} className="flex items-start bg-brand-yellow-light/30 p-4 rounded-lg">
          <InfoIcon className="w-5 h-5 text-brand-green mt-1 mr-3" />
          <p className="text-brand-text">{obs}</p>
        </div>
      ))}
    </div>
    <div className="mt-8 border-t pt-6">
      <h4 className="font-bold text-brand-green-dark mb-4 flex items-center">
        <LightbulbIcon className="w-5 h-5 mr-2" /> Contextual Observation Tips
      </h4>
      <ul className="list-disc list-inside space-y-2 text-brand-text/90 ml-2">
        {data.suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
    <p className="mt-6 text-xs text-brand-text/50 border-l-4 border-gray-200 pl-3 italic">{data.disclaimer}</p>
  </div>
);

const LayeredRender: React.FC<{ data: LayeredSupportResult }> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-brand-green-dark">Layered Scaffolding Plan</h3>
    <div className="grid gap-4">
      {[
        { title: '🌱 Basic Foundation (Minimum Success Units)', content: data.basicLevel, color: 'bg-green-50' },
        { title: '🌿 Standard Mastery (Main Class Objectives)', content: data.standardLevel, color: 'bg-blue-50' },
        { title: '🌳 Extended Enrichment (For Advanced Learners)', content: data.extensionLevel, color: 'bg-purple-50' },
      ].map((lvl, i) => (
        <div key={i} className={`${lvl.color} p-5 rounded-xl border border-black/5`}>
          <h4 className="font-bold mb-2 text-brand-text">{lvl.title}</h4>
          <p className="text-brand-text/80 whitespace-pre-wrap leading-relaxed">{lvl.content}</p>
        </div>
      ))}
    </div>
  </div>
);

const SuccessRender: React.FC<{ data: SuccessExperienceResult }> = ({ data }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-brand-green-dark">Micro-Success Unit Breakdown</h3>
    <div className="relative space-y-8 before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-brand-green/20">
      {data.microSteps.map((s, i) => (
        <div key={i} className="relative pl-12">
          <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-bold z-10 shadow-sm">
            {i + 1}
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-brand-green-dark">{s.step}</h4>
            <div className="mt-2 text-sm text-brand-text/70">
              <span className="font-semibold text-brand-green">Criterion: </span>{s.criterion}
            </div>
            <div className="mt-2 text-sm italic text-brand-green/80">
              “{s.feedback}”
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ToolsRender: React.FC<{ data: EfficiencyToolsResult }> = ({ data }) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold text-brand-green-dark">Generated Materials</h3>
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm font-mono text-sm leading-relaxed whitespace-pre-wrap">
      {data.content}
    </div>
    <button 
      onClick={() => navigator.clipboard.writeText(data.content)}
      className="text-sm text-brand-green font-medium hover:underline flex items-center"
    >
      <CheckCircleIcon className="w-4 h-4 mr-1" /> Copy to Clipboard
    </button>
  </div>
);

const VideoFeedbackRender: React.FC<{ data: FeedbackData }> = ({ data }) => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-brand-green-dark mb-4 border-b-2 border-brand-green-light pb-2">Classroom Observation Results</h2>
    {Object.entries(data).map(([key, value]) => (
      <div key={key} className="p-4 rounded-xl bg-brand-green-light/20 border border-brand-green-light/50">
        <h4 className="font-bold text-brand-green-dark mb-2">{(window as any).FEEDBACK_TITLES?.[key] || key}</h4>
        <p className="text-brand-text/90 whitespace-pre-wrap">{value}</p>
      </div>
    ))}
  </div>
);
