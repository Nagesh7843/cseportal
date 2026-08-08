import { GoogleGenAI } from '@google/genai';
import { NoticeItem, FacultyMember, StudentRecord, UploadAsset } from '@/types';

const getApiKey = (): string => {
  return (
    (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
    ((import.meta as any).env?.VITE_GEMINI_API_KEY) ||
    ''
  );
};

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const aiService = {
  /**
   * Advanced multi-turn conversation & context-aware AI assistant.
   */
  async askDepartmentAssistant(
    userQuery: string,
    history: ChatMessage[],
    mode: 'general' | 'academic' | 'faculty' | 'notices',
    contextData: {
      notices: NoticeItem[];
      faculty: FacultyMember[];
      students: StudentRecord[];
      documents: UploadAsset[];
    }
  ): Promise<string> {
    const apiKey = getApiKey();

    const modeFocus = {
      general: 'Focus on providing clean, concise, helpful guidance about SIT CSE Department Portal.',
      academic: 'Focus on curriculum, course credits, examination schemes, GPA calculations, and study materials.',
      faculty: 'Focus on faculty designations, current campus location (ON CAMPUS, IN LAB, IN MEETING), research, and office hours.',
      notices: 'Focus on filtering circulars, urgent notices, submission deadlines, and academic year targets.'
    }[mode];

    const systemPrompt = `You are the minimal, highly intelligent SIT CSE Department AI Assistant at Siddaganga Institute of Technology (SIT).
${modeFocus}

LIVE DEPARTMENTAL DATA:
- Department: Computer Science & Engineering (CSE), SIT Tumakuru
- Super Administrator & Controller: Nagesh (gnagesh550@gmail.com)
- Active Faculty Roster (${contextData.faculty.length}): ${contextData.faculty.map(f => `${f.name} [${f.status}] - Spec: ${f.specialization}, Office: ${f.officeHours || '9 AM - 5 PM'}`).join('; ')}
- Published Circulars (${contextData.notices.length}): ${contextData.notices.map(n => `[${n.priority}] "${n.title}" (Date: ${n.publishedAt})`).join('; ')}
- Available Study Documents (${contextData.documents.length}): ${contextData.documents.map(d => `${d.name} [${d.category}]`).join('; ')}

RESPONSE STYLE RULES:
1. Be ultra-concise, elegant, and minimal. Avoid fluff or unnecessary greeting preamble.
2. Use clean markdown formatting (bold highlights, bullet lists).
3. If giving faculty status, explicitly state if they are ON CAMPUS, IN LAB, IN MEETING, or OFF CAMPUS.
4. If asked about circulars or notices, highlight deadlines clearly.`;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const contents = [
          { role: 'user', parts: [{ text: systemPrompt }] },
          ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
          { role: 'user', parts: [{ text: userQuery }] }
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents
        });

        if (response && response.text) {
          return response.text;
        }
      } catch (err) {
        console.warn('Gemini API call warning, utilizing advanced local knowledge fallback:', err);
      }
    }

    return this.fallbackLocalKnowledgeEngine(userQuery, mode, contextData);
  },

  fallbackLocalKnowledgeEngine(
    query: string,
    mode: string,
    context: { notices: NoticeItem[]; faculty: FacultyMember[]; documents: UploadAsset[] }
  ): string {
    const q = query.toLowerCase();

    if (mode === 'faculty' || q.includes('faculty') || q.includes('professor') || q.includes('status')) {
      const facList = context.faculty.length > 0 
        ? context.faculty.map(f => `• **${f.name}**: ${f.status} (${f.specialization})`).join('\n')
        : '• **Dr. A. S. Poornima**: ON CAMPUS\n• **Prof. Veena K**: IN LAB\n• **Dr. R. Kumar**: IN MEETING';
      return `### 👨‍🏫 Faculty Status Directory\n\n${facList}\n\n*Note: Faculty status updates automatically upon campus check-in.*`;
    }

    if (mode === 'notices' || q.includes('notice') || q.includes('circular') || q.includes('urgent') || q.includes('exam')) {
      const urgent = context.notices.filter(n => n.priority === 'URGENT');
      const recentList = context.notices.slice(0, 3).map(n => `• **[${n.priority}] ${n.title}** (${n.publishedAt})`).join('\n');
      return `### 📢 Department Circulars\n\n**Total Notices**: ${context.notices.length}\n${urgent.length > 0 ? `🚨 **Urgent Notice**: ${urgent[0].title}\n\n` : ''}${recentList || '• No urgent notices currently pending.'}`;
    }

    if (mode === 'academic' || q.includes('syllabus') || q.includes('credit') || q.includes('gpa') || q.includes('course')) {
      return `### 🎓 Academic & Curriculum Guide\n\n• **Department**: Computer Science & Engineering (B.Tech)\n• **Syllabus & Notes**: Access all semester PDFs under **Documents Library**.\n• **CGPA Grading**: Based on SIT autonomous 10-point credit scale.\n• **Minimum Attendance**: 85% mandatory for examination eligibility.`;
    }

    if (q.includes('admin') || q.includes('nagesh') || q.includes('hod')) {
      return `### 👑 Administration\n\n• **Controller & Super Admin**: Nagesh (gnagesh550@gmail.com)\n• **Department**: Computer Science & Engineering, SIT Tumakuru\n• **Portal Access**: Role-based access for Admin, Faculty, and Students.`;
    }

    return `### 🤖 SIT CSE AI Assistant\n\nHow can I help you today? Select a mode above or ask about:\n• **Notices & Circulars**\n• **Faculty presence status**\n• **Syllabus & Study documents**`;
  }
};
