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

export const benefitsData = [
  {
    name: "Improved Confidence",
    description: "As you distance yourself from porn, you'll gradually notice improved confidence, especially in social situations.",
    imageUrl: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
  },
  {
    name: "Mental Clarity",
    description: "Brain fog will begin to clear, leading to improved focus, memory, and cognitive function."
  },
  {
    name: "Better Sleep",
    description: "Quitting porn allows your brain to rebalance neurotransmitters, leading to improved sleep quality."
  },
  {
    name: "Increased Productivity",
    description: "Free from distraction, you'll have more time and mental energy to focus on meaningful goals."
  },
  {
    name: "Healthier Thoughts",
    description: "Your thought patterns will normalize, leading to a more positive outlook and fewer intrusive thoughts."
  },
  {
    name: "Increased Libido",
    description: "Real-world arousal will improve as your brain recovers from artificial stimulation."
  }
];

export const milestonesData = [
  { days: 1, description: "First step completed!" },
  { days: 7, description: "One week milestone" },
  { days: 30, description: "One month clean" },
  { days: 90, description: "Full reboot achieved" }
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
    quote: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius"
  },
  {
    quote: "Fall seven times, stand up eight.",
    author: "Japanese Proverb"
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    quote: "The only person you should try to be better than is the person you were yesterday.",
    author: "Anonymous"
  },
  {
    quote: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln"
  }
];
