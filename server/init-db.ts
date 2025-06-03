import { db } from "./db";
import { 
  users, streaks, reasons, milestones, progress, 
  forumPosts, forumComments
} from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * Initialize the database with default data
 */
async function initDb() {
  console.log("Initializing database with default data...");
  
  try {
    // Always ensure TsingHar user exists for production deployment
    const [tsingharUser] = await db.select().from(users).where(eq(users.username, "TsingHar"));
    
    if (!tsingharUser) {
      console.log("Creating TsingHar user for production deployment...");
      // Create TsingHar user with exact credentials for deployment
      const [user] = await db.insert(users).values({
        username: "TsingHar",
        password: "Hui2025",
        email: "huangdanni2025@gmail.com"
      }).returning();
      
      const userId = user.id;
      
      // Create streak for TsingHar
      console.log("Creating TsingHar streak...");
      await db.insert(streaks).values({
        userId,
        startDate: new Date("2025-05-31T01:56:00Z"),
        currentStreak: 3,
        bestStreak: 14,
        lastUpdated: new Date()
      });
      
      // Add milestones and progress data for TsingHar
      console.log("Adding TsingHar milestones...");
      await db.insert(milestones).values([
        { userId, days: 1, achieved: true, achievedDate: new Date() },
        { userId, days: 3, achieved: true, achievedDate: new Date() },
        { userId, days: 7, achieved: false, achievedDate: null },
        { userId, days: 14, achieved: false, achievedDate: null },
        { userId, days: 21, achieved: false, achievedDate: null },
        { userId, days: 30, achieved: false, achievedDate: null },
        { userId, days: 60, achieved: false, achievedDate: null },
        { userId, days: 90, achieved: false, achievedDate: null }
      ]);
      
      // Add progress benefits for TsingHar
      console.log("Adding TsingHar progress benefits...");
      await db.insert(progress).values([
        { userId, benefit: "Improved Confidence", percentage: 3, lastUpdated: new Date() },
        { userId, benefit: "Mental Clarity", percentage: 2, lastUpdated: new Date() },
        { userId, benefit: "Better Sleep", percentage: 4, lastUpdated: new Date() },
        { userId, benefit: "Increased Productivity", percentage: 2, lastUpdated: new Date() }
      ]);
      
      console.log("TsingHar user initialization complete!");
    } else {
      console.log("TsingHar user already exists, skipping initialization.");
    }

    // Check if default user exists
    const [defaultUser] = await db.select().from(users).where(eq(users.username, "default"));
    
    if (!defaultUser) {
      console.log("Creating default user...");
      // Create default user
      const [user] = await db.insert(users).values({
        username: "default",
        password: "password"
      }).returning();
      
      const userId = user.id;
      
      // Create default streak
      console.log("Creating default streak...");
      await db.insert(streaks).values({
        userId,
        startDate: new Date(),
        currentStreak: 2,
        bestStreak: 14,
        lastUpdated: new Date()
      });
      
      // Add some reasons
      console.log("Adding default reasons...");
      await db.insert(reasons).values([
        { userId, title: "Mental Clarity", description: "To improve my mental clarity and focus", createdAt: new Date() },
        { userId, title: "Productivity", description: "To be more productive in my daily tasks", createdAt: new Date() },
        { userId, title: "Relationships", description: "To have better relationships with family and friends", createdAt: new Date() }
      ]);
      
      // Add meaningful recovery milestones
      console.log("Adding enhanced recovery milestones...");
      await db.insert(milestones).values([
        { userId, days: 1, achieved: true, achievedDate: new Date() },
        { userId, days: 3, achieved: false, achievedDate: null },
        { userId, days: 7, achieved: false, achievedDate: null },
        { userId, days: 14, achieved: false, achievedDate: null },
        { userId, days: 21, achieved: false, achievedDate: null },
        { userId, days: 30, achieved: false, achievedDate: null },
        { userId, days: 60, achieved: false, achievedDate: null },
        { userId, days: 90, achieved: false, achievedDate: null }
      ]);
      
      // Add progress benefits
      console.log("Adding default progress benefits...");
      await db.insert(progress).values([
        { userId, benefit: "Improved Confidence", percentage: 2, lastUpdated: new Date() },
        { userId, benefit: "Mental Clarity", percentage: 1, lastUpdated: new Date() },
        { userId, benefit: "Better Sleep", percentage: 3, lastUpdated: new Date() },
        { userId, benefit: "Increased Productivity", percentage: 1, lastUpdated: new Date() }
      ]);
      
      // Add some forum posts with recovery content
      console.log("Adding default forum posts...");
      const posts = [
        {
          title: "90天的转变：我的康复之路 | 90 Days Clean: My Recovery Journey",
          content: "经过三个月的康复，我想分享一些身心上的变化。最明显的是注意力集中了，睡眠质量也改善了，人际关系变得更真实。最重要的是，我重新找回了对生活的控制感。 | After three months clean, I want to share the changes I've experienced. The most noticeable improvements are better focus, improved sleep quality, and more authentic relationships. Most importantly, I've regained a sense of control over my life.",
          upvotes: 24,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          title: "寻求帮助：今天感觉很低落 | Need Help: Feeling Really Low Today",
          content: "今天真的很挣扎。工作压力很大，冲动比以往任何时候都强烈。有人能给些建议如何度过这个难关吗？我知道这只是暂时的，但现在感觉很困难。 | I'm really struggling today. Work has been stressful and the urges are stronger than ever. Anyone have advice on getting through this? I know it's temporary but it feels overwhelming right now.",
          upvotes: 8,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
        },
        {
          title: "每周问责检查 | Weekly Accountability Check-in",
          content: "大家好，今天是周日，我们的每周检查时间。这周你们过得怎么样？有什么挑战、胜利或下周的目标吗？记住，每一天的进步都值得庆祝。 | Hey everyone, it's Sunday - time for our weekly check-in. How did you do this week? Any challenges, victories or goals for next week? Remember, every day of progress is worth celebrating.",
          upvotes: 15,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          title: "书籍推荐：《你的大脑与色情》| Book Recommendation: Your Brain on Porn",
          content: "刚读完Gary Wilson的《你的大脑与色情》。强烈推荐！它用通俗易懂的方式解释了成瘾背后的科学原理。理解大脑的变化帮助我更好地应对康复过程。 | Just finished reading 'Your Brain on Porn' by Gary Wilson. Highly recommend it! It explains the science behind addiction in accessible ways. Understanding the brain changes has helped me better cope with recovery.",
          upvotes: 19,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
        },
        {
          title: "健康习惯替代法 | Healthy Habit Replacement Strategy",
          content: "分享一个对我很有效的方法：每当有冲动时，我就去做20个俯卧撑或冲个冷水澡。身体活动真的有助于重新引导注意力，而且让我感觉更强大。 | Sharing something that's been working for me: whenever I get urges, I do 20 pushups or take a cold shower. Physical activity really helps redirect focus and makes me feel empowered.",
          upvotes: 12,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
        },
        {
          title: "冥想如何改变了我的恢复 | How Meditation Changed My Recovery",
          content: "开始冥想后，我学会了观察冲动而不被它们控制。每天10分钟的正念练习让我在困难时刻保持清醒。推荐给所有在康复路上的朋友。 | Since starting meditation, I've learned to observe urges without being controlled by them. Just 10 minutes of daily mindfulness practice helps me stay clear-headed during difficult moments. Highly recommend to everyone on the recovery path.",
          upvotes: 21,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        }
      ];

      for (const postData of posts) {
        await db.insert(forumPosts).values({
          userId,
          title: postData.title,
          content: postData.content,
          upvotes: postData.upvotes,
          createdAt: postData.createdAt
        });
      }
      
      console.log("Database initialization complete!");
    } else {
      console.log("Default user already exists, skipping initialization.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export { initDb };