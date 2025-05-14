export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // General
    appName: 'NoFap Recovery Tracker',
    dashboard: 'Dashboard',
    library: 'Library',
    community: 'Community',
    menu: 'Menu',
    progress: 'Progress',
    
    // Auth
    login: 'Login',
    logout: 'Logout',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    confirmPassword: 'Confirm Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    noAccount: 'Don\'t have an account? Sign Up',
    hasAccount: 'Already have an account? Log in',
    enterEmailReset: 'Enter your email to reset your password.',
    resetPassword: 'Reset Password',
    submit: 'Submit',
    backToLogin: 'Back to Login',
    
    // Notifications
    regSuccess: 'Registration successful. Please log in.',
    emailExists: 'Email already exists.',
    passwordMismatch: 'Passwords do not match.',
    passwordTooShort: 'Password must be at least 6 characters.',
    invalidCredentials: 'Invalid email or password.',
    resetLinkSent: 'Password reset link sent. Please check your email.',
    enterValidEmail: 'Please enter a valid email address.',
    
    // Dashboard
    currentStreak: 'Current Streak: {n} days',
    longestStreak: 'Longest Streak: {n} days',
    lastRelapse: 'Last Relapse: {date}',
    never: 'Never',
    resetStreakBtn: 'Reset Streak',
    resetStreakConfirm: 'Are you sure you want to reset your streak?',
    yes: 'Yes',
    cancel: 'Cancel',
    
    // Progress
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    stage: 'Stage',
    stayCleanFor: 'Stay clean for {n} days',
    
    // Recovery Tools
    recoveryTools: 'Recovery Tools',
    learn: 'Learn',
    knowledgeBase: 'Knowledge base',
    chat: 'Chat',
    getSupport: 'Get support',
    milestones: 'Milestones',
    trackProgress: 'Track progress',
    reasons: 'Reasons',
    whyStarted: 'Why you started',
    
    // Mindfulness
    mindfulnessResources: 'Mindfulness Resources',
    breathing: 'Breathing',
    calmMind: 'Calm your mind',
    successStories: 'Success Stories',
    getInspired: 'Get inspired',
    
    // Todo
    todo: 'To-do',
    joinCommunity: 'Join Community',
    followTikTok: 'Follow on TikTok',
    
    // Panic Button
    panicButton: 'Panic Button',
    breatheIn: 'Breathe In',
    breatheOut: 'Breathe Out',
    hold: 'Hold',
    
    // Library
    quitPornEasily: 'Quit Porn Easily',
    articles: 'Articles',
    meditate: 'Meditate',
    podcast: 'Podcast',
    readTime: 'Read time: {n} min',
    
    // Misc
    progressMessage: 'You\'re making great progress! Stay strong and remember why you started.'
  },
  
  zh: {
    // General
    appName: '戒色恢复跟踪器',
    dashboard: '仪表板',
    library: '资料库',
    community: '社区',
    menu: '菜单',
    progress: '进度',
    
    // Auth
    login: '登录',
    logout: '退出登录',
    signUp: '注册',
    email: '邮箱',
    password: '密码',
    username: '用户名',
    confirmPassword: '确认密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码？',
    noAccount: '还没有账号？注册',
    hasAccount: '已有账号？登录',
    enterEmailReset: '请输入您的邮箱以重置密码。',
    resetPassword: '重置密码',
    submit: '提交',
    backToLogin: '返回登录',
    
    // Notifications
    regSuccess: '注册成功，请登录。',
    emailExists: '该邮箱已被注册。',
    passwordMismatch: '两次输入的密码不一致。',
    passwordTooShort: '密码至少需要6个字符。',
    invalidCredentials: '邮箱或密码不正确。',
    resetLinkSent: '重置密码链接已发送，请检查您的邮箱。',
    enterValidEmail: '请输入有效的邮箱地址。',
    
    // Dashboard
    currentStreak: '当前连续天数：{n} 天',
    longestStreak: '最长连续天数：{n} 天',
    lastRelapse: '上次破戒：{date}',
    never: '从未',
    resetStreakBtn: '重置计数',
    resetStreakConfirm: '确定要重置当前连续天数吗？',
    yes: '是',
    cancel: '取消',
    
    // Progress
    days: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
    stage: '阶段',
    stayCleanFor: '保持清醒 {n} 天',
    
    // Recovery Tools
    recoveryTools: '恢复工具',
    learn: '学习',
    knowledgeBase: '知识库',
    chat: '聊天',
    getSupport: '获取支持',
    milestones: '里程碑',
    trackProgress: '追踪进度',
    reasons: '理由',
    whyStarted: '为什么开始',
    
    // Mindfulness
    mindfulnessResources: '正念资源',
    breathing: '呼吸',
    calmMind: '平静心灵',
    successStories: '成功故事',
    getInspired: '获取灵感',
    
    // Todo
    todo: '待办事项',
    joinCommunity: '加入社区',
    followTikTok: '关注抖音',
    
    // Panic Button
    panicButton: '紧急按钮',
    breatheIn: '吸气',
    breatheOut: '呼气',
    hold: '保持',
    
    // Library
    quitPornEasily: '轻松戒除色情',
    articles: '文章',
    meditate: '冥想',
    podcast: '播客',
    readTime: '阅读时间：{n} 分钟',
    
    // Misc
    progressMessage: '你正在取得很大进步！保持坚强，记住你为什么开始。'
  }
};