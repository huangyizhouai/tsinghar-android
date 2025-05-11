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
        { userId, reason: "To improve my mental clarity", createdAt: new Date() },
        { userId, reason: "To be more productive", createdAt: new Date() },
        { userId, reason: "To have better relationships", createdAt: new Date() }
      ]);
      
      // Add milestones
      console.log("Adding default milestones...");
      await db.insert(milestones).values([
        { userId, days: 1, achieved: true, achievedDate: new Date() },
        { userId, days: 7, achieved: false, achievedDate: null },
        { userId, days: 30, achieved: false, achievedDate: null },
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
      
      // Add some forum posts
      console.log("Adding default forum posts...");
      const [post1] = await db.insert(forumPosts).values({
        userId,
        title: "I reached 90 days - Here's what changed",
        content: "After three months of staying clean, I wanted to share my experience and the benefits I've noticed physically and mentally...",
        upvotes: 0,
        createdAt: new Date()
      }).returning();
      
      const [post2] = await db.insert(forumPosts).values({
        userId,
        title: "Need serious help - feeling low",
        content: "I'm really struggling today. Had a stressful week at work and the urges are stronger than ever. Any advice on getting through this?",
        upvotes: 0,
        createdAt: new Date()
      }).returning();
      
      const [post3] = await db.insert(forumPosts).values({
        userId,
        title: "Weekly accountability check-in",
        content: "Hey everyone, it's Sunday - time for our weekly check-in. How did you do this week? Any challenges, victories or goals for next week?",
        upvotes: 0,
        createdAt: new Date()
      }).returning();
      
      const [post4] = await db.insert(forumPosts).values({
        userId,
        title: "Book recommendation: Your Brain on Porn",
        content: "Just finished reading \"Your Brain on Porn\" by Gary Wilson. Highly recommend it - it explains the science behind addiction in accessible ways...",
        upvotes: 0,
        createdAt: new Date()
      }).returning();
      
      // Upvote posts to different counts
      console.log("Adding upvotes to forum posts...");
      // Post 1: 24 upvotes
      await db.update(forumPosts).set({ upvotes: 24 }).where(eq(forumPosts.id, post1.id));
      
      // Post 2: 3 upvotes
      await db.update(forumPosts).set({ upvotes: 3 }).where(eq(forumPosts.id, post2.id));
      
      // Post 3: 18 upvotes
      await db.update(forumPosts).set({ upvotes: 18 }).where(eq(forumPosts.id, post3.id));
      
      // Post 4: 12 upvotes
      await db.update(forumPosts).set({ upvotes: 12 }).where(eq(forumPosts.id, post4.id));
      
      console.log("Database initialization complete!");
    } else {
      console.log("Default user already exists, skipping initialization.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

export { initDb };