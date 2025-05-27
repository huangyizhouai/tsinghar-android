import { useState, useEffect } from 'react';

export type Language = 'en' | 'zh';

// Language translations
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // App title
    appName: 'NoFap Recovery Tracker',
    achievements: 'Achievements',
    collected: 'collected',
    
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
    recovery: 'Recovery',
    streak: 'Streak',
    projectedQuitDate: 'Projected Quit Date',
    brainRewiring: 'Brain Rewiring',
    hr: 'hr',
    m: 'm',
    s: 's',
    
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
    emergency: 'EMERGENCY',
    holdToExit: 'Hold to exit',
    breatheDeep: 'Take a deep breath. This feeling will pass.',
    stayStrong: 'Stay Strong!',
    urgeTemporary: 'This urge is temporary and will pass. Take a deep breath and remember why you started this journey.',
    startBreathing: 'Start Breathing Exercise',
    viewReasons: 'View Your Reasons to Quit',
    watchMotivational: 'Watch Motivational Video',
    feelingBetter: 'I\'m Feeling Better Now',
    
    // Check-in flow
    dailyCheckIn: 'Daily Check-in',
    didYouRelapse: 'Did you relapse?',
    noStillStrong: 'No, still going strong',
    yesRelapsed: 'Yes, I relapsed',
    howAreYouFeeling: 'And how are you feeling?',
    happy: 'Happy',
    neutral: 'Neutral',
    sad: 'Sad',
    keepGoingMessage: 'Great job keeping your streak!',
    resetMessage: 'Every setback is a setup for a comeback',
    tomorrowNewDay: 'Tomorrow is a new day to start fresh',
    strengthGrows: 'Your strength grows with each challenge you overcome',
    communityMoodToday: 'Community Mood Today',
    continue: 'Continue',
    
    // Week bar
    mon: 'Mon',
    tue: 'Tue',
    wed: 'Wed',
    thu: 'Thu',
    fri: 'Fri',
    sat: 'Sat',
    sun: 'Sun',
    
    // Quick actions
    meditate: 'Meditate',
    more: 'More',
  },
  
  zh: {
    // App title
    appName: '清者',
    achievements: '成就',
    collected: '已收集',
    
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
    openAnalytics: '打开分析',
    
    // Common labels
    yes: '是',
    cancel: '取消',
    
    // Progress metrics
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
    recovery: '恢复',
    streak: '连续',
    projectedQuitDate: '预计戒除日期',
    brainRewiring: '大脑重塑',
    hr: '小时',
    m: '分',
    s: '秒',
    
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
    
    // Library
    libraryHeader: '轻松戒色',
    articles: '文章',
    meditate: '冥想',
    podcast: '播客',
    
    // Mindfulness section
    mindfulnessResources: '正念资源',
    breathing: '呼吸',
    calmMind: '平静心灵',
    successStories: '成功故事',
    getInspired: '获取灵感',
    
    // Todo section
    todo: '待办事项',
    joinCommunity: '加入社区',
    followTikTok: '关注抖音号',
    
    // Menu
    myJournal: '我的日志',
    leaderboard: '排行榜',
    help: '帮助与支持',
    settings: '设置',
    
    // Panic button
    panicButton: '紧急按钮',
    emergency: '紧急情况',
    holdToExit: '长按退出',
    breatheDeep: '深呼吸。这种感觉会过去的。',
    stayStrong: '保持坚强！',
    urgeTemporary: '这种冲动是暂时的，很快就会过去。深呼吸，记住你为什么开始这段旅程。',
    startBreathing: '开始呼吸练习',
    viewReasons: '查看您戒除的原因',
    watchMotivational: '观看激励视频',
    feelingBetter: '我现在感觉好多了',
    
    // Breathing
    breathingTitle: '呼吸练习',
    startGuidedSession: '开始引导',
    
    // Community
    communityJoinBtn: '加入社区',
    emptyStateCommunity: '暂无帖子，抢先分享你的故事吧！🌱',
    
    // Check-in flow
    dailyCheckIn: '每日签到',
    didYouRelapse: '你破戒了吗？',
    noStillStrong: '没有，继续坚持',
    yesRelapsed: '是的，我破戒了',
    howAreYouFeeling: '你感觉如何？',
    happy: '开心',
    neutral: '一般',
    sad: '难过',
    keepGoingMessage: '继续保持你的连续天数！',
    resetMessage: '每次挫折都是东山再起的机会',
    tomorrowNewDay: '明天是重新开始的新一天',
    strengthGrows: '你的力量随着每次克服挑战而增长',
    communityMoodToday: '今日社区心情',
    continue: '继续',
    
    // Fun copy and motivational quotes
    achievementUnlockedToast: '🎉 恭喜！你已解锁「{{name}}」徽章！',
    
    // Week bar
    mon: '周一',
    tue: '周二',
    wed: '周三',
    thu: '周四',
    fri: '周五',
    sat: '周六',
    sun: '周日',
    
    // Quick actions
    more: '更多',
  }
};

// State to track current language
let currentLanguage: Language = 'zh';

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

// Export the main i18n API