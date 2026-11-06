
import React from 'react';
import { FeedbackData } from '../types';
import { FEEDBACK_PLACEHOLDER, FEEDBACK_SECTION_TITLES } from '../constants';
import { SpinnerIcon, LightbulbIcon, BookOpenIcon, PencilIcon } from './Icons';

interface FeedbackDisplayProps {
  feedback: FeedbackData | null;
  isLoading: boolean;
  error: string | null;
  progress: number;
  loadingMessage: string;
}

const FeedbackCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 md:p-8 flex flex-col">
    {children}
  </div>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-10 h-10 rounded-full bg-brand-green-light flex items-center justify-center mr-4 shrink-0">
      {children}
    </div>
);

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, error, progress, loadingMessage }) => {
  if (isLoading) {
    return (
      <FeedbackCard>
        <div className="flex flex-col items-center justify-center text-center text-brand-text h-full">
          <SpinnerIcon className="w-12 h-12 text-brand-green" />
          <h3 className="mt-4 text-xl font-semibold">正在用心分析您的课堂...</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5 my-4">
            <div 
                className="bg-brand-green h-2.5 rounded-full" 
                style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}
            ></div>
          </div>
          <p className="mt-2 text-brand-text/70 min-h-[2em]">{loadingMessage || '请稍候...'}</p>
        </div>
      </FeedbackCard>
    );
  }

  if (error) {
    return (
      <FeedbackCard>
        <div className="flex flex-col items-center justify-center text-center text-red-600 h-full">
          <h3 className="text-xl font-semibold">哦呀，出了一点小问题</h3>
          <p className="mt-2 text-red-500">{error}</p>
        </div>
      </FeedbackCard>
    );
  }

  if (feedback) {
    const specialKeys: Array<keyof FeedbackData> = [
      'improvementSuggestions',
      'classSummary',
      'homeworkSuggestion',
    ];
    const detailedFeedbackKeys = (Object.keys(feedback) as Array<keyof FeedbackData>)
      .filter(key => !specialKeys.includes(key));

    return (
      <FeedbackCard>
        <div className="overflow-y-auto pr-4 -mr-4">
            <h2 className="text-3xl font-bold text-brand-green-dark mb-6 pb-4 border-b-2 border-brand-green-light/80">您的专属成长反馈</h2>
            
            <div className="space-y-6 mb-8">
              {feedback.classSummary && (
                <div className="bg-brand-green-light/40 p-5 rounded-xl transition-shadow hover:shadow-md">
                  <div className="flex items-start">
                    <IconWrapper>
                      <BookOpenIcon className="w-6 h-6 text-brand-green-dark" />
                    </IconWrapper>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-green-dark">
                        {FEEDBACK_SECTION_TITLES['classSummary']}
                      </h3>
                      <p className="mt-2 text-brand-text/90 whitespace-pre-wrap leading-relaxed">
                        {feedback.classSummary}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {feedback.homeworkSuggestion && (
                <div className="bg-brand-green-light/40 p-5 rounded-xl transition-shadow hover:shadow-md">
                  <div className="flex items-start">
                    <IconWrapper>
                      <PencilIcon className="w-6 h-6 text-brand-green-dark" />
                    </IconWrapper>
                    <div>
                      <h3 className="text-lg font-semibold text-brand-green-dark">
                        {FEEDBACK_SECTION_TITLES['homeworkSuggestion']}
                      </h3>
                      <p className="mt-2 text-brand-text/90 whitespace-pre-wrap leading-relaxed">
                        {feedback.homeworkSuggestion}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {detailedFeedbackKeys.map((key) => (
              <div key={key} className="p-4 rounded-lg border border-gray-200/90 bg-white/50">
                <h3 className="text-lg font-semibold text-brand-green-dark flex items-center">
                  {FEEDBACK_SECTION_TITLES[key] || key}
                </h3>
                <p className="mt-2 text-brand-text/90 whitespace-pre-wrap leading-relaxed">
                  {feedback[key]}
                </p>
              </div>
            ))}
            </div>
            
            {feedback.improvementSuggestions && (
                <div key="improvementSuggestions" className="mt-10 pt-6 border-t-4 border-brand-green rounded-b-lg">
                  <div className="flex items-start">
                    <IconWrapper>
                      <LightbulbIcon className="w-6 h-6 text-brand-green-dark" />
                    </IconWrapper>
                    <div>
                      <h3 className="text-xl font-bold text-brand-green-dark">
                          {FEEDBACK_SECTION_TITLES['improvementSuggestions']}
                      </h3>
                      <div className="mt-3 bg-brand-green-light/50 p-4 rounded-lg">
                        <p className="text-brand-text/90 whitespace-pre-wrap leading-relaxed">
                            {feedback.improvementSuggestions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            )}
        </div>
      </FeedbackCard>
    );
  }

  return (
    <FeedbackCard>
      <div className="flex flex-col items-center justify-center text-center text-brand-text/60 h-full">
        <h3 className="text-xl font-medium">{FEEDBACK_PLACEHOLDER}</h3>
      </div>
    </FeedbackCard>
  );
};
