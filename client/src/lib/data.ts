// Education content
export interface Article {
  id: string;
  moduleId: number;
  category: string;
  title: string;
  description: string;
  readTime: number; // in minutes
  content: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  articles: Article[];
}

export interface MeditationTrack {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  duration: number; // in seconds
  audioUrl: string;
  color: string;
  description?: string;
  descriptionEn?: string;
}

export interface LeaderboardUser {
  id: number;
  name: string;
  initials: string;
  streak: number;
  rank: number;
  isCurrentUser: boolean;
}

export const benefitsData = [
  {
    name: "Improved Confidence",
    nameZh: "自信心提升",
    description: "As you distance yourself from porn, you'll gradually notice improved confidence, especially in social situations.",
    descriptionZh: "远离色情内容后，你会逐渐注意到自信心的提升，特别是在社交场合中。",
    resources: [
      "Practice eye contact in conversations",
      "Join social activities or clubs", 
      "Set and achieve small daily goals"
    ],
    resourcesZh: [
      "在对话中练习眼神交流",
      "参加社交活动或俱乐部",
      "设定并实现日常小目标"
    ],
    imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    name: "Mental Clarity",
    nameZh: "思维清晰",
    description: "Brain fog will begin to clear, leading to improved focus, memory, and cognitive function.",
    descriptionZh: "大脑迷雾开始消散，专注力、记忆力和认知功能得到改善。",
    resources: [
      "Practice meditation for 10 minutes daily",
      "Read books to exercise your mind",
      "Try brain training exercises"
    ],
    resourcesZh: [
      "每天冥想10分钟",
      "阅读书籍锻炼大脑",
      "尝试大脑训练练习"
    ]
  },
  {
    name: "Better Sleep",
    nameZh: "睡眠改善",
    description: "Quitting porn allows your brain to rebalance neurotransmitters, leading to improved sleep quality.",
    descriptionZh: "戒除色情内容让大脑重新平衡神经递质，改善睡眠质量。",
    resources: [
      "Establish a consistent bedtime routine",
      "Avoid screens 1 hour before bed",
      "Create a comfortable sleep environment"
    ],
    resourcesZh: [
      "建立固定的睡前例行公事",
      "睡前1小时避免使用电子设备",
      "创造舒适的睡眠环境"
    ]
  },
  {
    name: "Increased Productivity",
    nameZh: "工作效率提升",
    description: "Free from distraction, you'll have more time and mental energy to focus on meaningful goals.",
    descriptionZh: "摆脱分心，你将有更多时间和精神能量专注于有意义的目标。",
    resources: [
      "Use time-blocking techniques",
      "Set clear daily priorities",
      "Take regular productive breaks"
    ],
    resourcesZh: [
      "使用时间分块技术",
      "设定明确的日常优先事项",
      "定期进行有效休息"
    ]
  },
  {
    name: "Emotional Balance",
    nameZh: "情绪平衡",
    description: "Your emotional responses will stabilize, leading to better mood regulation and stress management.",
    descriptionZh: "你的情绪反应会更加稳定，改善情绪调节和压力管理。",
    resources: [
      "Practice deep breathing exercises",
      "Keep a gratitude journal",
      "Connect with supportive friends"
    ],
    resourcesZh: [
      "练习深呼吸运动",
      "记录感恩日记",
      "与支持你的朋友联系"
    ]
  },
  {
    name: "Physical Health",
    nameZh: "身体健康",
    description: "Improved energy levels, better posture, and enhanced physical vitality as your body recovers.",
    descriptionZh: "随着身体恢复，能量水平提升，姿态改善，身体活力增强。",
    resources: [
      "Start a regular exercise routine",
      "Focus on proper nutrition",
      "Stay hydrated throughout the day"
    ],
    resourcesZh: [
      "开始定期锻炼计划",
      "专注于合理营养",
      "全天保持充足水分"
    ]
  }
];

export const milestonesData = [
  { 
    days: 1, 
    description: "First step completed!",
    category: "commitment"
  },
  { 
    days: 3, 
    description: "Health improvement begins",
    category: "health"
  },
  { 
    days: 7, 
    description: "Mental clarity improving",
    category: "mental"
  },
  { 
    days: 14, 
    description: "Life balance restoring",
    category: "balance"
  },
  { 
    days: 21, 
    description: "Productivity enhancement",
    category: "productivity"
  },
  { 
    days: 30, 
    description: "Emotional stability gained",
    category: "emotional"
  },
  { 
    days: 60, 
    description: "Relationship quality improving",
    category: "relationships"
  },
  { 
    days: 90, 
    description: "Full brain reboot achieved",
    category: "complete"
  }
];

export const libraryCategories: Category[] = [
  {
    id: "addiction-myths",
    name: "Addiction and Myths",
    articles: [
      {
        id: "neuroscience-porn-addiction",
        moduleId: 1,
        category: "addiction-myths",
        title: "The Neuroscience of Porn Addiction",
        description: "Understanding how porn affects your brain chemistry and reward pathways.",
        readTime: 10,
        content: "Pornography activates the brain's reward system by releasing dopamine, similar to how drugs affect the brain. With repeated viewing, neural pathways are reinforced, requiring more novel or extreme content to achieve the same level of arousal. This leads to desensitization, where normal sexual encounters may no longer provide sufficient stimulation. Breaking free requires allowing the brain to form new, healthier neural pathways through abstinence and healthy activities."
      },
      {
        id: "debunking-myths",
        moduleId: 2,
        category: "addiction-myths",
        title: "Debunking Common Myths about Porn",
        description: "Separating fact from fiction about pornography usage and effects.",
        readTime: 8,
        content: "Many people believe that pornography use is harmless or even beneficial, but research shows otherwise. Contrary to popular belief, porn does not reduce sexual assault rates (it may normalize sexual violence), doesn't serve as sex education (it creates unrealistic expectations), and isn't simply an expression of high libido (it can actually reduce real-world desire). Understanding these myths helps create a clear picture of why abstaining from porn is beneficial for mental and relational health."
      },
      {
        id: "triggers-patterns",
        moduleId: 3,
        category: "addiction-myths",
        title: "Identifying Triggers and Patterns",
        description: "Learn to recognize what leads to relapse and how to intervene early.",
        readTime: 12,
        content: "Porn use often follows predictable patterns triggered by specific emotional states or situations. Common triggers include stress, boredom, loneliness, and fatigue. By keeping a journal of urges and identifying the HALT factors (Hungry, Angry, Lonely, Tired), you can develop strategies to address the underlying needs in healthier ways. Creating an 'if-then' plan for each trigger helps rewire automatic responses and builds resilience against urges."
      }
    ]
  },
  {
    id: "health-effects",
    name: "Health Effects",
    articles: [
      {
        id: "physical-consequences",
        moduleId: 1,
        category: "health-effects",
        title: "Physical Consequences of Porn Use",
        description: "How excessive porn consumption affects your physical health and energy.",
        readTime: 9,
        content: "Excessive pornography use can lead to several physical health issues. Many users report fatigue from disrupted sleep patterns and energy depletion after binges. Some experience physical symptoms like PIED (Porn-Induced Erectile Dysfunction), which affects sexual performance with real partners. The constant dopamine spikes can also reduce overall energy and motivation for physical activity. Recovery typically shows improvements in energy levels, sleep quality, and sexual function as the brain rebalances."
      },
      {
        id: "emotional-effects",
        moduleId: 2,
        category: "health-effects",
        title: "Emotional Effects on the Brain",
        description: "Understanding the impacts on mood, motivation, and emotional regulation.",
        readTime: 11,
        content: "Pornography use significantly impacts emotional regulation. The dopamine-driven reward system becomes less responsive to everyday pleasures, often leading to symptoms similar to depression. Many users report emotional numbness, increased anxiety, shame, and guilt. The brain's prefrontal cortex, responsible for decision-making and impulse control, can become weakened with excessive use. During recovery, emotional sensitivity typically returns, sometimes intensely at first, but eventually stabilizes into healthier emotional patterns."
      }
    ]
  },
  {
    id: "recovery-strategies",
    name: "Recovery Strategies",
    articles: [
      {
        id: "mindfulness-meditation",
        moduleId: 1,
        category: "recovery-strategies",
        title: "Embracing Mindfulness",
        description: "Meditation techniques to manage urges and stay present.",
        readTime: 15,
        content: "Mindfulness meditation strengthens the prefrontal cortex, the part of your brain responsible for impulse control. When practiced regularly, mindfulness helps you observe urges without automatically acting on them. Start with just 5 minutes daily of focused breathing, gradually increasing to 15-20 minutes. When urges arise, use the RAIN technique: Recognize the urge, Allow it to be there without judgment, Investigate how it feels in your body, and Note that urges are temporary sensations that will pass.",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&h=220"
      },
      {
        id: "recovery-plan",
        moduleId: 2,
        category: "recovery-strategies",
        title: "Creating a Recovery Plan",
        description: "Building a personalized strategy for long-term success.",
        readTime: 10,
        content: "A successful recovery plan addresses multiple aspects of your life. Start by defining clear, measurable goals (e.g., 90 days porn-free). Identify and eliminate easy access points by installing blockers and creating environmental barriers. Schedule alternative activities during vulnerable times. Create a daily routine that includes exercise, healthy social contact, and mindfulness practice. Develop a relapse prevention plan with specific steps to take when urges are strong. Review and adjust your plan weekly based on what's working and what isn't."
      },
      {
        id: "community-support",
        moduleId: 3,
        category: "recovery-strategies",
        title: "Leveraging Community Support",
        description: "How to use accountability partners and groups effectively.",
        readTime: 8,
        content: "Social support significantly increases recovery success rates. An accountability partner provides mutual support through regular check-ins, celebrating milestones, and offering encouragement during difficult times. When selecting a partner, choose someone you trust but who will hold you accountable without judgment. Set clear expectations about communication frequency and boundaries. Support groups, whether online or in-person, offer broader perspective and reduce feelings of isolation. Active participation by sharing your experiences and supporting others reinforces your own commitment to recovery."
      }
    ]
  }
];

export const motivationalQuotes = [
  {
    quote: "不积跬步，无以至千里。",
    author: "荀子"
  },
  {
    quote: "跌倒七次，站起来八次。",
    author: "日本谚语"
  },
  {
    quote: "开始不必伟大，但要伟大必须开始。",
    author: "齐格·齐格拉"
  },
  {
    quote: "你应该超越的唯一对手，是昨天的自己。",
    author: "佚名"
  },
  {
    quote: "自律是选择你现在想要的，还是你最想要的。",
    author: "亚伯拉罕·林肯"
  },
  {
    quote: "日日行，不怕千万里；常常做，不怕千万事。",
    author: "毛泽东"
  },
  {
    quote: "水滴石穿，不是因为它的力量，而是因为它的坚持。",
    author: "中国谚语"
  },
  {
    quote: "千里之行，始于足下。",
    author: "老子"
  }
];

export const meditationTracks: MeditationTrack[] = [
  {
    id: "urge-control",
    title: "抵制冲动",
    titleEn: "Urge Control",
    subtitle: "强化自律 · 7分钟",
    subtitleEn: "Strengthen Self-Control · 7 min",
    duration: 420, // 7 minutes
    audioUrl: "custom:urge-control",
    color: "#F9A826", // Yellow/Orange
    description: "特别设计的4-7-8呼吸法冥想练习，帮助克服冲动和增强意志力。当你感到冲动或者想要放弃时，这个音频将帮助你平静下来，重新掌控自己。",
    descriptionEn: "A specially designed 4-7-8 breathing meditation practice to help overcome urges and strengthen willpower. When you feel urges or want to give up, this audio will help you calm down and regain control."
  },
  {
    id: "calmness",
    title: "平静心灵",
    titleEn: "Inner Calmness",
    subtitle: "呼吸练习 · 5分钟",
    subtitleEn: "Breathing Exercise · 5 min",
    duration: 300, // 5 minutes
    audioUrl: "custom:calmness",
    color: "#7C4DFF", // Purple
    description: "这个平静的呼吸引导练习使用箱式呼吸法（4-4-4-4），帮助你快速找回平静和专注。适合焦虑或压力大的时候使用。",
    descriptionEn: "This calming guided breathing practice uses box breathing (4-4-4-4) to help you quickly regain calm and focus. Perfect for times of anxiety or stress."
  },
  {
    id: "gratitude",
    title: "感恩冥想",
    titleEn: "Gratitude Meditation",
    subtitle: "增强动力 · 6分钟",
    subtitleEn: "Boost Motivation · 6 min",
    duration: 360, // 6 minutes
    audioUrl: "custom:gratitude",
    color: "#10B981", // Emerald
    description: "这个冥想练习帮助你培养感恩的心态，提醒自己戒色旅程的目标和重要性。在感到迷茫或缺乏动力时特别有效。",
    descriptionEn: "This meditation practice helps you cultivate gratitude and reminds you of your recovery journey's goals and importance. Especially effective when feeling lost or lacking motivation."
  },
  {
    id: "deep-sleep",
    title: "深度睡眠",
    titleEn: "Deep Sleep",
    subtitle: "放松身心 · 10分钟",
    subtitleEn: "Relax Body & Mind · 10 min",
    duration: 600, // 10 minutes
    audioUrl: "custom:deep-sleep",
    color: "#8B5CF6", // Purple
    description: "这个冥想练习使用4-8呼吸节奏帮助你放松并准备睡眠。睡眠质量对抵抗冲动至关重要，这个音频帮助你获得更好的夜间休息。",
    descriptionEn: "This meditation practice uses 4-8 breathing rhythm to help you relax and prepare for sleep. Quality sleep is crucial for resisting urges, and this audio helps you get better nighttime rest."
  }
];

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    name: "J.",
    initials: "J",
    streak: 739350,
    rank: 1,
    isCurrentUser: false
  },
  {
    id: 2,
    name: "No Nut Final Boss",
    initials: "NN",
    streak: 739349, 
    rank: 2,
    isCurrentUser: false
  },
  {
    id: 3,
    name: "NoFapKing123",
    initials: "NK",
    streak: 739348,
    rank: 3,
    isCurrentUser: false
  },
  {
    id: 4,
    name: "John Doe",
    initials: "JD",
    streak: 2,
    rank: 356,
    isCurrentUser: true
  }
];
