import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

// Language translations
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App title
    appName: 'NoFap Recovery Tracker',
    
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
    appName: '戒色恢复跟踪器',
    
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

// State to track current language
let currentLanguage: Language = 'en';

// Try to load from localStorage on init
try {
  const saved = localStorage.getItem('language');
  if (saved === 'en' || saved === 'zh') {
    currentLanguage = saved as Language;
  }
} catch (e) {
  console.error('Error accessing localStorage:', e);
}

// Get the current language
export function getCurrentLanguage(): Language {
  return currentLanguage;
}

// Set the language
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
  try {
    localStorage.setItem('language', lang);
  } catch (e) {
    console.error('Error saving language:', e);
  }
}

// Toggle between English and Chinese
export function toggleLanguage(): void {
  const newLang = currentLanguage === 'en' ? 'zh' : 'en';
  setLanguage(newLang);
  // Trigger a custom event so components can update
  window.dispatchEvent(new Event('languagechange'));
}

// Translate a key
export function translate(key: string, params?: Record<string, string | number>): string {
  const dict = translations[currentLanguage] || translations.en;
  const text = dict[key] || key;
  
  if (params) {
    let result = text;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(`{${paramKey}}`, String(paramValue));
    });
    return result;
  }
  
  return text;
}

// React hook for translation
import { useState, useEffect } from 'react';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage());
  
  // Update state when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageState(getCurrentLanguage());
    };
    
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);
  
  // Wrapper for translate
  const t = (key: string, params?: Record<string, string | number>) => {
    return translate(key, params);
  };
  
  return {
    language,
    t,
    setLanguage: (lang: Language) => {
      setLanguage(lang);
      setLanguageState(lang);
      window.dispatchEvent(new Event('languagechange'));
    },
    toggleLanguage: () => {
      toggleLanguage();
      setLanguageState(getCurrentLanguage());
    }
  };
}