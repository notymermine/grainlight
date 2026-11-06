
export interface FeedbackData {
  classSummary: string;
  homeworkSuggestion: string;
  languageUse: string;
  classInteraction: string;
  studentEngagement: string;
  teachingMethod: string;
  nonVerbalCommunication: string;
  teachingEffectiveness: string;
  improvementSuggestions: string;
}

export interface StudentStatusResult {
  observations: string[];
  suggestions: string[];
  disclaimer: string;
}

export interface LayeredSupportResult {
  basicLevel: string;
  standardLevel: string;
  extensionLevel: string;
}

export interface SuccessExperienceResult {
  microSteps: { step: string; criterion: string; feedback: string }[];
}

export interface EfficiencyToolsResult {
  content: string;
}

export type AppModule = 'video' | 'student' | 'layered' | 'success' | 'tools';
