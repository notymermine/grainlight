
import React from 'react';
import { MODULES } from '../constants';
import * as Icons from './Icons';
import { AppModule } from '../types';

interface ModuleSwitcherProps {
  activeModule: AppModule;
  onSwitch: (module: AppModule) => void;
}

export const ModuleSwitcher: React.FC<ModuleSwitcherProps> = ({ activeModule, onSwitch }) => {
  return (
    <nav className="flex items-center justify-center p-2 mb-10 bg-white/40 backdrop-blur-md rounded-[1.5rem] shadow-lg shadow-black/[0.03] border border-white/60 max-w-5xl mx-auto overflow-x-auto no-scrollbar">
      {MODULES.map((mod) => {
        const Icon = (Icons as any)[mod.icon] || Icons.BookOpenIcon;
        const isActive = activeModule === mod.id;
        return (
          <button
            key={mod.id}
            onClick={() => onSwitch(mod.id as AppModule)}
            className={`flex items-center space-x-3 px-8 py-4 rounded-[1.2rem] transition-all duration-500 whitespace-nowrap group relative ${
              isActive 
                ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' 
                : 'text-brand-text/60 hover:text-brand-green hover:bg-white/80'
            }`}
          >
            <Icon className={`w-6 h-6 transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-brand-green/70 group-hover:scale-110'}`} />
            <div className="flex flex-col items-start">
              <span className="font-bold text-[15px] leading-tight tracking-tight">{mod.name}</span>
              <span className={`text-[9px] font-black uppercase tracking-widest mt-0.5 transition-colors duration-500 ${isActive ? 'text-white/60' : 'text-brand-text/20 group-hover:text-brand-green/40'}`}>
                {(mod as any).enName}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
};
