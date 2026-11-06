
import { Type } from "@google/genai";

export const APP_TITLE = 'GrainLight · Intelligent Teaching Partner';
export const APP_SUBTITLE = 'Teaching Support Platform for Real Classrooms';
export const APP_SUBTITLE_EN = 'GrainLight: Empowering Every Classroom';

export const GULI_PROJECT_INTRO = `Grain of Growth (GoG) is a student-led nonprofit consisted of 27 student members and 5 teacher advisors. Our work began with the belief that educational inequality is not only a matter of access to resources, but also of whose knowledge, experiences, and ways of learning are valued. By connecting urban students with rural classrooms, we aim to support rural learners to rebuild confidence, expand perspectives, and see more about the world.

Through fieldwork and collaboration with schools in Xiangxi, Hunan, we gradually realized that challenges in rural education do not originate from students’ learning abilities. More often, they arise from structural constraints faced by rural teachers, such as role conflicts, heavy administrative demands, and limited capacity to respond to diverse learning needs. In response, GoG developed GrainLight, a teacher-facing AI support tool designed to work with teachers rather than replace them. Grounded in local contexts, GrainLight provides low-threshold assistance, such as pedagogical advice, identifications of learning difficulties, and step-by-step learning tasks, so that teachers can better attend to student differences without added burden. Our goal is not to make teaching more “automated,” but to make rural teaching more sustainable, humane, and responsive to real rural classroom.`;

export const MODULES = [
  { id: 'video', name: 'Visual Classroom', enName: 'Observation', icon: 'FilmIcon' },
  { id: 'student', name: 'Student Briefing', enName: 'Insights', icon: 'UserGroupIcon' },
  { id: 'layered', name: 'Layered Guide', enName: 'Scaffolding', icon: 'ChartBarIcon' },
  { id: 'tools', name: 'Teaching Toolkit', enName: 'Efficiency', icon: 'BriefcaseIcon' },
];

export const MODULE_DESCRIPTIONS: Record<string, string> = {
  video: "Visual Classroom (Observation) helps teachers objectively observe learning phenomena through video or text descriptions. The system focuses on 'what happened' rather than evaluating quality. It prioritizes local contexts familiar to students in the Xiangxi region, ideal for post-class reflection.",
  student: "Student Briefing (Insights) assists in identifying students who may need extra attention. By inputting class summaries or notes, the system highlights potential risks (e.g., declining engagement) and explains them within the context of rural family backgrounds. Results are for reference only and do not label or classify students.",
  layered: "Layered Guide (Scaffolding) integrates 'Micro-Success' goals, breaking teaching content into three levels: Basic, Standard, and Extension. The Basic level emphasizes 'minimum finishable units' to ensure students with weaker foundations gain a sense of achievement quickly. Examples are tied to Xiangxi's local daily life.",
  tools: "Teaching Toolkit (Efficiency) focuses on reducing repetitive work. Quickly generate classroom quizzes, answer keys, and error analysis. The output is 'concise and direct,' using explanations rooted in rural students' cognitive experience to save time rather than add burden."
};

export const FEEDBACK_SECTION_TITLES: { [key: string]: string } = {
  classSummary: 'Class Observation Summary',
  homeworkSuggestion: 'Local Context Homework Ideas',
  languageUse: 'Language Interaction Observation',
  classInteraction: 'Interaction Distribution',
  studentEngagement: 'Engagement Trends',
  teachingMethod: 'Teaching Rhythm Insights',
  nonVerbalCommunication: 'Non-verbal Feedback',
  teachingEffectiveness: 'Learning Goal Tracking',
  improvementSuggestions: 'Reflective Teaching Tips',
};

// Localized background constraints
const XIANGXI_CONTEXT = `
  IMPORTANT: Your audience is rural teachers and students in the Xiangxi region of Hunan.
  CONTEXTUAL REQUIREMENT: When explaining concepts, giving examples, or designing tasks, you MUST use local contexts familiar to Xiangxi students (e.g., local markets/Ganjie, cured meat/Laro, mountain springs, Miao embroidery, traditional farming, forest landscapes, local fairs).
  LANGUAGE PRINCIPLE: Avoid urban, elite, or overly academic language detached from rural reality.
  ETHICAL BOUNDARY: Strictly avoid judgmental or labeling language (e.g., 'bad students', 'failed teaching'). All output must be formatted as 'observation prompts' or 'auxiliary suggestions' and responded in English.
`;

export const PROMPTS = {
  video: `
    You are a classroom observation assistant. Analyze the uploaded information (video frames or text).
    Goal: Describe learning phenomena, engagement distribution, and attention shifts.
    ${XIANGXI_CONTEXT}
    Output must strictly follow the provided JSON Schema in English.
  `,
  student: `
    You are a student status analysis expert. Analyze the provided class data or notes.
    Goal: Identify trends needing attention (e.g., low motivation, declining participation).
    Contextual Analysis: Consider rural background factors like limited family support or vague learning goals.
    ${XIANGXI_CONTEXT}
    Respond in English.
  `,
  layered: `
    You are a differentiated teaching expert. Break down the content into:
    1. Basic Understanding: With 'Minimum Success Experience' designs.
    2. Standard Mastery: The main class objectives.
    3. Extension/Enrichment: For advanced learners.
    ${XIANGXI_CONTEXT}
    Respond in English.
  `,
  tools: `
    You are a teaching efficiency assistant. Generate concise, usable materials.
    Explain problems or errors using methods rooted in rural students' cognitive experiences.
    ${XIANGXI_CONTEXT}
    Respond in English.
  `
};

export const SCHEMAS = {
  video: {
    type: Type.OBJECT,
    properties: {
      classSummary: { type: Type.STRING },
      homeworkSuggestion: { type: Type.STRING },
      languageUse: { type: Type.STRING },
      classInteraction: { type: Type.STRING },
      studentEngagement: { type: Type.STRING },
      teachingMethod: { type: Type.STRING },
      nonVerbalCommunication: { type: Type.STRING },
      teachingEffectiveness: { type: Type.STRING },
      improvementSuggestions: { type: Type.STRING },
    },
    required: ['classSummary', 'homeworkSuggestion', 'languageUse', 'classInteraction', 'studentEngagement', 'teachingMethod', 'nonVerbalCommunication', 'teachingEffectiveness', 'improvementSuggestions'],
  },
  student: {
    type: Type.OBJECT,
    properties: {
      observations: { type: Type.ARRAY, items: { type: Type.STRING } },
      suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
      disclaimer: { type: Type.STRING }
    },
    required: ['observations', 'suggestions', 'disclaimer'],
  },
  layered: {
    type: Type.OBJECT,
    properties: {
      basicLevel: { type: Type.STRING },
      standardLevel: { type: Type.STRING },
      extensionLevel: { type: Type.STRING },
    },
    required: ['basicLevel', 'standardLevel', 'extensionLevel'],
  },
  tools: {
    type: Type.OBJECT,
    properties: {
      content: { type: Type.STRING }
    },
    required: ['content'],
  }
};

export const LOADING_MESSAGES = [
  'Connecting to the soil of Xiangxi...',
  'Assistant is observing classroom phenomena...',
  'Thinking for every micro-success...',
  'Preparing suggestions tailored to rural life...',
];

export const UPLOAD_PROMPT = 'Drag video or enter classroom text description';
export const UPLOAD_BUTTON_TEXT = 'Select Video File';
export const ANALYZE_BUTTON_TEXT = 'Start AI Observation';
export const FEEDBACK_PLACEHOLDER = 'Suggestions will appear here after generation';
