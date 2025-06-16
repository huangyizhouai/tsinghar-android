export type Language = 'en' | 'zh';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App title
    appName: 'Tsinghar',
    
    // Navigation
    dashboard: 'Dashboard',
    library: 'Library',
    community: 'Community',
    menu: 'Menu',
    progress: 'Progress',
    
    // Dashboard
    currentStreak: 'Current Streak: {n} days',
    longestStreak: 'Longest Streak: {n} days',
    lastRelapse: 'Last Relapse: {date}',
    never: 'Never',
    resetStreak: 'Reset Streak',
    progressMessage: "You're making great progress! Stay strong and remember why you started.",
    
    // Common labels
    yes: 'Yes',
    cancel: 'Cancel',
    
    // Progress metrics
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    
    // Recovery Tools section
    recoveryTools: 'Recovery Tools',
    learn: 'Learn',
    knowledgeBase: 'Knowledge base',
    chat: 'Chat',
    getSupport: 'Get support',
    milestones: 'Milestones',
    trackProgress: 'Track progress',
    reasons: 'Reasons',
    whyStarted: 'Why you started',
    
    // Mindfulness section
    mindfulnessResources: 'Mindfulness Resources',
    breathing: 'Breathing',
    calmMind: 'Calm your mind',
    successStories: 'Success Stories',
    getInspired: 'Get inspired',
    
    // Todo section
    todo: 'To-do',
    joinCommunity: 'Join Community',
    followTikTok: 'Follow on TikTok',
    
    // Panic button
    panicButton: 'Panic Button',
  },
  
  zh: {
    // App title
    appName: '清花',
    
    // Navigation
    dashboard: '仪表板',
    library: '资料库',
    community: '社区',
    menu: '菜单',
    progress: '进度',
    
    // Dashboard
    currentStreak: '当前连续天数：{n} 天',
    longestStreak: '最长连续天数：{n} 天',
    lastRelapse: '上次破戒：{date}',
    never: '从未',
    resetStreak: '重置计数',
    progressMessage: '你正在取得很大进步！保持坚强，记住你为什么开始。',
    
    // Common labels
    yes: '是',
    cancel: '取消',
    
    // Progress metrics
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
    
    // Recovery Tools section
    recoveryTools: '恢复工具',
    learn: '学习',
    knowledgeBase: '知识库',
    chat: '聊天',
    getSupport: '获取支持',
    milestones: '里程碑',
    trackProgress: '追踪进度',
    reasons: '理由',
    whyStarted: '为什么开始',
    
    // Mindfulness section
    mindfulnessResources: '正念资源',
    breathing: '呼吸',
    calmMind: '平静心灵',
    successStories: '成功故事',
    getInspired: '获取灵感',
    
    // Todo section
    todo: '待办事项',
    joinCommunity: '加入社区',
    followTikTok: '关注抖音',
    
    // Panic button
    panicButton: '紧急按钮',
  }
};

// Current language
let currentLanguage: Language = 'en';

// Initialize language from localStorage if available
try {
  const saved = localStorage.getItem('language') as Language;
  if (saved && (saved === 'en' || saved === 'zh')) {
    currentLanguage = saved;
  }
} catch (e) {
  console.error('Error accessing localStorage:', e);
}

// Get the current language
export const getCurrentLanguage = (): Language => {
  return currentLanguage;
};

// Set the language
export const setLanguage = (lang: Language): void => {
  currentLanguage = lang;
  try {
    localStorage.setItem('language', lang);
  } catch (e) {
    console.error('Failed to save language preference:', e);
  }
};

// Toggle between English and Chinese
export const toggleLanguage = (): void => {
  const newLang: Language = currentLanguage === 'en' ? 'zh' : 'en';
  setLanguage(newLang);
};

// Translate a key with optional parameters
export const translate = (key: string, params?: Record<string, string | number>): string => {
  // Get translations for current language or fall back to English
  const langTranslations = translations[currentLanguage] || translations.en;
  
  // Get the translated text or fall back to the key itself
  const translationObj = langTranslations as Record<string, string>;
  const text = translationObj[key] || key;
  
  // Replace parameters if provided
  if (params) {
    let result = text;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(`{${paramKey}}`, String(paramValue));
    });
    return result;
  }
  
  return text;
};