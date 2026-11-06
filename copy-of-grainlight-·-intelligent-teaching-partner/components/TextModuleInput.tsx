
import React, { useState } from 'react';
import { AppModule } from '../types';

interface TextModuleInputProps {
  module: AppModule;
  onSubmit: (input: string) => void;
  isLoading: boolean;
  compact?: boolean;
}

const MODULE_GUIDES: Record<AppModule, { title: string; placeholder: string; label: string }> = {
  video: { 
    title: 'Text-based Observation', 
    label: 'Describe classroom phenomena', 
    placeholder: 'Example: This lesson covered vegetation in Xiangxi. Students were excited during group discussions but attention drifted during writing exercises, especially among those in the back...' 
  },
  student: { 
    title: 'Student Input', 
    label: 'Enter class overview or observation notes', 
    placeholder: 'Example: 35 students, 70% passed the last quiz. A few students are very silent in class. Looking for insights considering rural family support levels.' 
  },
  layered: { 
    title: 'Content Scaffolding', 
    label: 'Enter teaching points or topics', 
    placeholder: 'Example: English Grammar "Going Shopping". Design a layered guide using the context of a local Xiangxi fair (Ganjie), including a "Minimum Success Unit".' 
  },
  success: { 
    title: 'Micro-Success (Integrated)', 
    label: '', 
    placeholder: '' 
  },
  tools: { 
    title: 'Request Materials', 
    label: 'Describe the teaching materials you need', 
    placeholder: 'Example: Generate 5 quiz questions for "Past Continuous tense". Use rural daily life scenarios for the context.' 
  },
};

export const TextModuleInput: React.FC<TextModuleInputProps> = ({ module, onSubmit, isLoading, compact }) => {
  const [text, setText] = useState('');
  const guide = MODULE_GUIDES[module === 'success' ? 'layered' : module];

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
  };

  if (module === 'video' && !compact) return null;

  return (
    <div className={`flex flex-col ${compact ? 'flex-grow' : 'h-full'} bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 transition-all duration-300`}>
      <h2 className={`${compact ? 'text-lg' : 'text-2xl'} font-bold text-brand-green-dark mb-4`}>{guide.title}</h2>
      {guide.label && <label className="block text-sm font-medium text-brand-text/70 mb-2">{guide.label}</label>}
      <textarea
        className="flex-grow p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none resize-none bg-brand-yellow-light/20 text-brand-text text-sm md:text-base"
        placeholder={guide.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={`${compact ? 'mt-4' : 'mt-6'}`}>
        <button
          onClick={handleSubmit}
          disabled={!text.trim() || isLoading}
          className={`w-full bg-brand-green text-white font-bold ${compact ? 'py-2 px-3' : 'py-3 px-4'} rounded-lg shadow-md hover:bg-brand-green-dark transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Processing...' : 'Generate Suggestions'}
        </button>
      </div>
      {!compact && (
        <p className="mt-4 text-xs text-brand-text/50 italic text-center">
          * Suggestions are for reference only. Professional judgment remains with the teacher.
        </p>
      )}
    </div>
  );
};
