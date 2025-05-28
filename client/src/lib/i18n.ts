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
  },
  
  zh: {
    // App title
    appName: '清心',
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
    podcast: '播客',
    
    // Mindfulness section
    mindfulnessResources: '正念资源',
    breathing: '呼吸',
    calmMind: '平静心灵',
    successStories: '成功故事',
    getInspired: '获取灵感',
    meditate: '冥想',
    
    // Todo section
    todo: '待办事项',
    joinCommunity: '加入社区',
    followTikTok: '关注抖音号',
    
    // Menu
    myJournal: '我的日志',
    leaderboard: '排行榜',
    help: '帮助与支持',
    settings: '设置',
    dailyMotivation: '每日激励',
    
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
    
    // Buttons and actions
    save: '保存',
    cancelBtn: '取消',
    ok: '确定',
    edit: '编辑',
    delete: '删除',
    reset: '重置',
    apply: '应用',
    undo: '撤销',
    add: '添加',
    confirm: '确认',
    close: '关闭',
    start: '开始',
    stop: '停止',
    pause: '暂停',
    resume: '继续',
    submit: '提交',
    send: '发送',
    share: '分享',
    copy: '复制',
    download: '下载',
    upload: '上传',
    refresh: '刷新',
    retry: '重试',
    skip: '跳过',
    next: '下一步',
    previous: '上一步',
    finish: '完成',
    
    // Navigation buttons
    'nav.dashboard': '仪表盘',
    'nav.statistics': '统计',
    'nav.settings': '设置',
    'nav.logout': '退出',
    
    // Language toggle
    'lang.en': 'English',
    'lang.zh': '中文',
    
    // Dashboard buttons
    'dash.add': '添加',
    'dash.edit': '编辑',
    'dash.delete': '删除',
    'dash.resetStreak': '重置纪录',
    
    // Modal buttons
    'modal.save': '保存',
    'modal.cancel': '取消',
    
    // Statistics buttons
    'stats.apply': '应用',
    'stats.reset': '重置',
    
    // Settings buttons
    'settings.save': '保存',
    'settings.cancel': '取消',
    
    // Common dialog buttons
    'common.ok': '确定',
    'common.cancel': '取消',
    
    // Toast buttons
    'toast.undo': '撤销',
    
    // State text
    'state.loading': '加载中…',
    'state.disabled': '已禁用',
    
    // Progress page
    recoveryBenefits: '康复益处',
    milestonesTitle: '里程碑',
    achieved: '已达成',
    daysLeft: '天后达成',
    daysSingle: '天',
    
    // Motivational messages
    beginningJourney: '今天标志着强大旅程的开始。记住，小步骤会带来巨大变化。',
    buildingMomentum: '最初几天很有挑战性，但你正在积累动力。每一天都在加强你的决心。',
    toughestPart: '你已经度过了最艰难的部分！你的大脑已经开始愈合。',
    incredibleProgress: '令人难以置信的进步！你对这段旅程的承诺正在创造持久的积极变化。',
    
    // Library page
    articlesTitle: '文章',
    meditateTitle: '冥想',
    learnTitle: '学习',
    podcastTitle: '播客',
    leaderboardTitle: '排行榜',
    comingSoon: '即将推出',
    featureInDevelopment: '此功能正在开发中。',
    complete: '已完成',
    quitPornEasily: '轻松戒色',
    articlesDescription: '阅读这些教育文章，了解成瘾、健康影响和康复策略。',
    meditateDescription: '使用这些引导冥想来克服冲动并平静你的心灵。定期练习能增强你的意志力和专注力。',
    
    // Community page
    forum: '论坛',
    teams: '团队',
    loadingPosts: '加载帖子中...',
    noPostsYet: '暂无帖子，抢先分享你的故事吧！',
    createNewPost: '发表新帖',
    shareExperiences: '分享你的经历，提出问题，或为社区提供支持。',
    postTitle: '帖子标题',
    shareThoughts: '分享你的想法...',
    posting: '发布中...',
    post: '发布',
    postCreated: '帖子已发布',
    postCreatedDesc: '你的帖子已成功发布！',
    error: '错误',
    failedCreatePost: '发布失败，请重试。',
    titleContentRequired: '标题和内容为必填项',
    failedUpvotePost: '点赞失败',
    teamsComingSoon: '团队支持功能正在开发中。',
    joinAccountabilityGroups: '在不久的将来加入互助小组！',
    
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