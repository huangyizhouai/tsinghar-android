// Education content
export interface Article {
  id: string;
  moduleId: number;
  category: string;
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  readTime: number; // in minutes
  content: string;
  contentZh?: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  nameZh?: string;
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
    nameZh: "成瘾与误区",
    articles: [
      {
        id: "neuroscience-porn-addiction",
        moduleId: 1,
        category: "addiction-myths",
        title: "The Neuroscience of Porn Addiction",
        titleZh: "色情成瘾的神经科学",
        description: "Understanding how porn affects your brain chemistry and reward pathways.",
        descriptionZh: "了解色情内容如何影响大脑化学和奖励机制。",
        readTime: 10,
        content: "Pornography activates the brain's reward system by releasing dopamine, similar to how drugs affect the brain. With repeated viewing, neural pathways are reinforced, requiring more novel or extreme content to achieve the same level of arousal. This leads to desensitization, where normal sexual encounters may no longer provide sufficient stimulation. Breaking free requires allowing the brain to form new, healthier neural pathways through abstinence and healthy activities.",
        contentZh: "色情内容通过释放多巴胺激活大脑的奖励系统，与毒品对大脑的影响相似。重复观看会强化神经通路，需要更新奇或极端的内容才能达到同样的兴奋水平。这导致脱敏现象，正常的性接触可能无法再提供充分的刺激。摆脱成瘾需要通过戒断和健康活动让大脑形成新的、更健康的神经通路。"
      },
      {
        id: "debunking-myths",
        moduleId: 2,
        category: "addiction-myths",
        title: "Debunking Common Myths about Porn",
        titleZh: "揭穿关于色情的常见误区",
        description: "Separating fact from fiction about pornography usage and effects.",
        descriptionZh: "区分关于色情使用及其影响的事实与谬误。",
        readTime: 8,
        content: "Many people believe that pornography use is harmless or even beneficial, but research shows otherwise. Contrary to popular belief, porn does not reduce sexual assault rates (it may normalize sexual violence), doesn't serve as sex education (it creates unrealistic expectations), and isn't simply an expression of high libido (it can actually reduce real-world desire). Understanding these myths helps create a clear picture of why abstaining from porn is beneficial for mental and relational health.",
        contentZh: "许多人认为观看色情内容无害甚至有益，但研究表明情况并非如此。与流行观念相反，色情内容不会降低性侵犯率（反而可能将性暴力正常化），不能作为性教育（会产生不切实际的期望），也不仅仅是高性欲的表现（实际上可能降低现实世界的欲望）。理解这些误区有助于清楚地认识戒除色情对心理和关系健康的益处。"
      },
      {
        id: "triggers-patterns",
        moduleId: 3,
        category: "addiction-myths",
        title: "Identifying Triggers and Patterns",
        titleZh: "识别触发因素和模式",
        description: "Learn to recognize what leads to relapse and how to intervene early.",
        descriptionZh: "学会识别导致复发的因素，以及如何早期干预。",
        readTime: 12,
        content: "Porn use often follows predictable patterns triggered by specific emotional states or situations. Common triggers include stress, boredom, loneliness, and fatigue. By keeping a journal of urges and identifying the HALT factors (Hungry, Angry, Lonely, Tired), you can develop strategies to address the underlying needs in healthier ways. Creating an 'if-then' plan for each trigger helps rewire automatic responses and builds resilience against urges.",
        contentZh: "色情使用往往遵循由特定情绪状态或情况触发的可预测模式。常见触发因素包括压力、无聊、孤独和疲劳。通过记录冲动日记并识别HALT因素（饥饿、愤怒、孤独、疲倦），你可以制定策略以更健康的方式满足潜在需求。为每个触发因素制定'如果-那么'计划有助于重新连接自动反应，增强对冲动的抵抗力。"
      }
    ]
  },
  {
    id: "health-effects",
    name: "Health Effects",
    nameZh: "健康影响",
    articles: [
      {
        id: "physical-consequences",
        moduleId: 1,
        category: "health-effects",
        title: "Physical Consequences of Porn Use",
        titleZh: "色情使用的身体后果",
        description: "How excessive porn consumption affects your physical health and energy.",
        descriptionZh: "过度色情消费如何影响你的身体健康和精力。",
        readTime: 9,
        content: "Excessive pornography use can lead to several physical health issues. Many users report fatigue from disrupted sleep patterns and energy depletion after binges. Some experience physical symptoms like PIED (Porn-Induced Erectile Dysfunction), which affects sexual performance with real partners. The constant dopamine spikes can also reduce overall energy and motivation for physical activity. Recovery typically shows improvements in energy levels, sleep quality, and sexual function as the brain rebalances.",
        contentZh: "过度使用色情内容可能导致多种身体健康问题。许多用户报告由于睡眠模式紊乱和暴食后精力耗尽而感到疲劳。一些人会出现PIED（色情诱发的勃起功能障碍）等身体症状，这影响与真实伴侣的性表现。持续的多巴胺激增也会降低整体精力和进行体育活动的动机。随着大脑重新平衡，康复通常会显示精力水平、睡眠质量和性功能的改善。"
      },
      {
        id: "emotional-effects",
        moduleId: 2,
        category: "health-effects",
        title: "Emotional Effects on the Brain",
        titleZh: "对大脑的情感影响",
        description: "Understanding the impacts on mood, motivation, and emotional regulation.",
        descriptionZh: "了解对情绪、动机和情感调节的影响。",
        readTime: 11,
        content: "Pornography use significantly impacts emotional regulation. The dopamine-driven reward system becomes less responsive to everyday pleasures, often leading to symptoms similar to depression. Many users report emotional numbness, increased anxiety, shame, and guilt. The brain's prefrontal cortex, responsible for decision-making and impulse control, can become weakened with excessive use. During recovery, emotional sensitivity typically returns, sometimes intensely at first, but eventually stabilizes into healthier emotional patterns.",
        contentZh: "色情使用显著影响情感调节。多巴胺驱动的奖励系统对日常乐趣的反应性降低，往往导致类似抑郁症的症状。许多用户报告情感麻木、焦虑增加、羞耻和内疚感。负责决策和冲动控制的大脑前额叶皮质在过度使用时可能会变弱。在康复过程中，情感敏感性通常会恢复，起初可能很强烈，但最终会稳定为更健康的情感模式。"
      }
    ]
  },
  {
    id: "recovery-strategies",
    name: "Recovery Strategies",
    nameZh: "康复策略",
    articles: [
      {
        id: "mindfulness-meditation",
        moduleId: 1,
        category: "recovery-strategies",
        title: "Embracing Mindfulness",
        titleZh: "拥抱正念",
        description: "Meditation techniques to manage urges and stay present.",
        descriptionZh: "管理冲动并保持专注当下的冥想技巧。",
        readTime: 15,
        content: "Mindfulness meditation strengthens the prefrontal cortex, the part of your brain responsible for impulse control. When practiced regularly, mindfulness helps you observe urges without automatically acting on them. Start with just 5 minutes daily of focused breathing, gradually increasing to 15-20 minutes. When urges arise, use the RAIN technique: Recognize the urge, Allow it to be there without judgment, Investigate how it feels in your body, and Note that urges are temporary sensations that will pass.",
        contentZh: "正念冥想强化前额叶皮质，这是大脑中负责冲动控制的部分。定期练习正念有助于观察冲动而不自动行动。从每日5分钟的专注呼吸开始，逐渐增加到15-20分钟。当冲动出现时，使用RAIN技巧：识别冲动，允许它不带判断地存在，调查它在身体中的感受，注意冲动是会过去的暂时感觉。",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&h=220&q=80"
      },
      {
        id: "recovery-plan",
        moduleId: 2,
        category: "recovery-strategies",
        title: "Creating a Recovery Plan",
        titleZh: "制定康复计划",
        description: "Building a personalized strategy for long-term success.",
        descriptionZh: "建立个性化的长期成功策略。",
        readTime: 10,
        content: "A successful recovery plan addresses multiple aspects of your life. Start by defining clear, measurable goals (e.g., 90 days porn-free). Identify and eliminate easy access points by installing blockers and creating environmental barriers. Schedule alternative activities during vulnerable times. Create a daily routine that includes exercise, healthy social contact, and mindfulness practice. Develop a relapse prevention plan with specific steps to take when urges are strong. Review and adjust your plan weekly based on what's working and what isn't.",
        contentZh: "成功的康复计划涉及生活的多个方面。首先定义清晰、可衡量的目标（例如，90天无色情）。通过安装拦截器和创建环境障碍来识别并消除容易接触的途径。在脆弱时段安排替代活动。创建包括运动、健康社交接触和正念练习的日常程序。制定复发预防计划，包括在冲动强烈时采取的具体步骤。根据有效和无效的方法每周回顾和调整计划。",
        imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&h=220&q=80"
      },
      {
        id: "community-support",
        moduleId: 3,
        category: "recovery-strategies",
        title: "Leveraging Community Support",
        titleZh: "利用社区支持",
        description: "How to use accountability partners and groups effectively.",
        descriptionZh: "如何有效利用责任伙伴和支持小组。",
        readTime: 8,
        content: "Social support significantly increases recovery success rates. An accountability partner provides mutual support through regular check-ins, celebrating milestones, and offering encouragement during difficult times. When selecting a partner, choose someone you trust but who will hold you accountable without judgment. Set clear expectations about communication frequency and boundaries. Support groups, whether online or in-person, offer broader perspective and reduce feelings of isolation. Active participation by sharing your experiences and supporting others reinforces your own commitment to recovery.",
        contentZh: "社会支持显著提高康复成功率。责任伙伴通过定期检查、庆祝里程碑和在困难时期提供鼓励来提供相互支持。选择伙伴时，选择你信任但会在不评判的情况下让你负责的人。对沟通频率和界限设定明确期望。支持小组，无论是在线还是面对面，都能提供更广阔的视角并减少孤立感。通过分享经历和支持他人来积极参与，这强化了你对康复的承诺。",
        imageUrl: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=450&h=220&q=80"
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
  // Mindfulness & Focus Category
  {
    id: "mindful-awareness",
    title: "正念觉察",
    titleEn: "Mindful Awareness",
    subtitle: "专注当下 · 8分钟",
    subtitleEn: "Present Moment Focus · 8 min",
    duration: 480, // 8 minutes
    audioUrl: "custom:mindful-awareness",
    color: "#6366F1", // Indigo
    description: "通过正念练习培养对当下的觉察，帮助你观察想法而不被它们带走。这个练习增强你的注意力和情绪调节能力。",
    descriptionEn: "Develop present-moment awareness through mindfulness practice, helping you observe thoughts without being carried away by them. This practice enhances your attention and emotional regulation abilities."
  },
  {
    id: "focused-breathing",
    title: "专注呼吸",
    titleEn: "Focused Breathing",
    subtitle: "增强专注力 · 6分钟",
    subtitleEn: "Enhance Concentration · 6 min",
    duration: 360, // 6 minutes
    audioUrl: "custom:focused-breathing",
    color: "#0EA5E9", // Sky Blue
    description: "通过专注于呼吸来训练你的注意力。这个简单而强大的练习是所有冥想的基础，帮助你建立心理韧性。",
    descriptionEn: "Train your attention by focusing on the breath. This simple yet powerful practice is the foundation of all meditation, helping you build mental resilience."
  },

  // Stress Relief & Relaxation Category
  {
    id: "stress-relief",
    title: "释放压力",
    titleEn: "Stress Relief",
    subtitle: "身心放松 · 12分钟",
    subtitleEn: "Body & Mind Relaxation · 12 min",
    duration: 720, // 12 minutes
    audioUrl: "custom:stress-relief",
    color: "#059669", // Emerald Green
    description: "渐进式肌肉放松结合深度呼吸，帮助你释放身体紧张和心理压力。适合在紧张或疲劳时使用。",
    descriptionEn: "Progressive muscle relaxation combined with deep breathing to help you release physical tension and mental stress. Perfect for when feeling tense or fatigued."
  },
  {
    id: "inner-peace",
    title: "内心平静",
    titleEn: "Inner Peace",
    subtitle: "寻找宁静 · 10分钟",
    subtitleEn: "Finding Tranquility · 10 min",
    duration: 600, // 10 minutes
    audioUrl: "custom:inner-peace",
    color: "#7C3AED", // Violet
    description: "通过冥想找到内心的平静与安宁。这个练习帮助你在混乱的世界中建立一个宁静的内在空间。",
    descriptionEn: "Find inner peace and serenity through meditation. This practice helps you create a tranquil inner space amidst the chaos of the world."
  },

  // Recovery & Motivation Category
  {
    id: "urge-control",
    title: "抵制冲动",
    titleEn: "Urge Control",
    subtitle: "强化自律 · 7分钟",
    subtitleEn: "Strengthen Self-Control · 7 min",
    duration: 420, // 7 minutes
    audioUrl: "custom:urge-control",
    color: "#F59E0B", // Amber
    description: "特别设计的4-7-8呼吸法冥想练习，帮助克服冲动和增强意志力。当你感到冲动或者想要放弃时，这个音频将帮助你平静下来，重新掌控自己。",
    descriptionEn: "A specially designed 4-7-8 breathing meditation practice to help overcome urges and strengthen willpower. When you feel urges or want to give up, this audio will help you calm down and regain control."
  },
  {
    id: "motivation-boost",
    title: "动力提升",
    titleEn: "Motivation Boost",
    subtitle: "重燃斗志 · 9分钟",
    subtitleEn: "Reignite Drive · 9 min",
    duration: 540, // 9 minutes
    audioUrl: "custom:motivation-boost",
    color: "#DC2626", // Red
    description: "通过可视化和积极暗示重新点燃你的动力和决心。这个练习帮助你记住目标，增强继续前进的意志。",
    descriptionEn: "Reignite your motivation and determination through visualization and positive affirmations. This practice helps you remember your goals and strengthens your will to keep moving forward."
  },

  // Sleep & Recovery Category
  {
    id: "deep-sleep",
    title: "深度睡眠",
    titleEn: "Deep Sleep",
    subtitle: "优质睡眠 · 15分钟",
    subtitleEn: "Quality Sleep · 15 min",
    duration: 900, // 15 minutes
    audioUrl: "custom:deep-sleep",
    color: "#1E293B", // Slate
    description: "通过渐进放松和呼吸调节帮助你进入深度睡眠。良好的睡眠是康复过程中的重要支柱。",
    descriptionEn: "Enter deep sleep through progressive relaxation and breath regulation. Quality sleep is a crucial pillar in the recovery process."
  },
  {
    id: "body-scan",
    title: "身体扫描",
    titleEn: "Body Scan",
    subtitle: "全身放松 · 11分钟",
    subtitleEn: "Full Body Relaxation · 11 min",
    duration: 660, // 11 minutes
    audioUrl: "custom:body-scan",
    color: "#475569", // Gray
    description: "系统性地放松身体的每个部位，释放紧张和促进深度放松。这个练习也有助于改善睡眠质量。",
    descriptionEn: "Systematically relax every part of your body, releasing tension and promoting deep relaxation. This practice also helps improve sleep quality."
  }
];

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 1,
    name: "J.",
    initials: "J",
    streak: 456,
    rank: 1,
    isCurrentUser: false
  },
  {
    id: 2,
    name: "No Nut Final Boss",
    initials: "NN",
    streak: 387, 
    rank: 2,
    isCurrentUser: false
  },
  {
    id: 3,
    name: "NoFapKing123",
    initials: "NK",
    streak: 312,
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
