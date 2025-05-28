import { 
  users, type User, type InsertUser,
  streaks, type Streak, type InsertStreak,
  reasons, type Reason, type InsertReason,
  forumPosts, type ForumPost, type InsertForumPost,
  forumComments, type ForumComment, type InsertForumComment,
  milestones, type Milestone, type InsertMilestone,
  progress, type Progress, type InsertProgress,
  articleProgress, type ArticleProgress, type InsertArticleProgress
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User>;

  // Streak methods
  getStreak(userId: number): Promise<Streak | undefined>;
  createStreak(streak: InsertStreak): Promise<Streak>;
  updateStreak(userId: number, days: number): Promise<Streak>;
  resetStreak(userId: number): Promise<Streak>;

  // Reasons methods
  getReasons(userId: number): Promise<Reason[]>;
  addReason(reason: InsertReason): Promise<Reason>;
  deleteReason(id: number): Promise<boolean>;

  // Forum methods
  getAllPosts(): Promise<ForumPost[]>;
  getPost(id: number): Promise<ForumPost | undefined>;
  createPost(post: InsertForumPost): Promise<ForumPost>;
  upvotePost(id: number): Promise<ForumPost>;
  getPostComments(postId: number): Promise<ForumComment[]>;
  addComment(comment: InsertForumComment): Promise<ForumComment>;

  // Milestones methods
  getMilestones(userId: number): Promise<Milestone[]>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: number, achieved: boolean): Promise<Milestone>;

  // Progress methods
  getProgress(userId: number): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, percentage: number): Promise<Progress>;

  // Article progress methods
  getArticleProgress(userId: number): Promise<ArticleProgress[]>;
  markArticleCompleted(userId: number, articleId: string): Promise<ArticleProgress>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getStreak(userId: number): Promise<Streak | undefined> {
    const [streak] = await db.select().from(streaks).where(eq(streaks.userId, userId));
    return streak;
  }

  async createStreak(insertStreak: InsertStreak): Promise<Streak> {
    const [streak] = await db.insert(streaks).values(insertStreak).returning();
    return streak;
  }

  async updateStreak(userId: number, days: number): Promise<Streak> {
    const [streak] = await db.select().from(streaks).where(eq(streaks.userId, userId));
    
    if (!streak) {
      throw new Error("Streak not found");
    }
    
    const [updatedStreak] = await db
      .update(streaks)
      .set({ 
        currentStreak: days, 
        bestStreak: Math.max(streak.bestStreak, days),
        lastUpdated: new Date()
      })
      .where(eq(streaks.userId, userId))
      .returning();
    
    return updatedStreak;
  }

  async resetStreak(userId: number): Promise<Streak> {
    const [updatedStreak] = await db
      .update(streaks)
      .set({
        currentStreak: 0,
        startDate: new Date(),
        lastUpdated: new Date()
      })
      .where(eq(streaks.userId, userId))
      .returning();
    
    if (!updatedStreak) {
      throw new Error("Streak not found");
    }
    
    return updatedStreak;
  }

  async getReasons(userId: number): Promise<Reason[]> {
    const reasonsList = await db.select().from(reasons).where(eq(reasons.userId, userId));
    return reasonsList;
  }

  async addReason(insertReason: InsertReason): Promise<Reason> {
    const [reason] = await db.insert(reasons).values(insertReason).returning();
    return reason;
  }

  async deleteReason(id: number): Promise<boolean> {
    const result = await db.delete(reasons).where(eq(reasons.id, id)).returning();
    return result.length > 0;
  }

  async getAllPosts(): Promise<ForumPost[]> {
    return db.select().from(forumPosts).orderBy(forumPosts.createdAt);
  }

  async getPost(id: number): Promise<ForumPost | undefined> {
    const [post] = await db.select().from(forumPosts).where(eq(forumPosts.id, id));
    return post;
  }

  async createPost(insertPost: InsertForumPost): Promise<ForumPost> {
    const [post] = await db.insert(forumPosts).values(insertPost).returning();
    return post;
  }

  async upvotePost(id: number): Promise<ForumPost> {
    const [post] = await db.select().from(forumPosts).where(eq(forumPosts.id, id));
    
    if (!post) {
      throw new Error("Post not found");
    }
    
    const [updatedPost] = await db
      .update(forumPosts)
      .set({ upvotes: post.upvotes + 1 })
      .where(eq(forumPosts.id, id))
      .returning();
    
    return updatedPost;
  }

  async getPostComments(postId: number): Promise<ForumComment[]> {
    return db
      .select()
      .from(forumComments)
      .where(eq(forumComments.postId, postId))
      .orderBy(forumComments.createdAt);
  }

  async addComment(insertComment: InsertForumComment): Promise<ForumComment> {
    const [comment] = await db
      .insert(forumComments)
      .values(insertComment)
      .returning();
    
    return comment;
  }

  async getMilestones(userId: number): Promise<Milestone[]> {
    return db
      .select()
      .from(milestones)
      .where(eq(milestones.userId, userId))
      .orderBy(milestones.days);
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const [milestone] = await db
      .insert(milestones)
      .values({
        ...insertMilestone,
        achievedDate: insertMilestone.achieved ? new Date() : null
      })
      .returning();
    
    return milestone;
  }

  async updateMilestone(id: number, achieved: boolean): Promise<Milestone> {
    const [updatedMilestone] = await db
      .update(milestones)
      .set({
        achieved,
        achievedDate: achieved ? new Date() : null
      })
      .where(eq(milestones.id, id))
      .returning();
    
    if (!updatedMilestone) {
      throw new Error("Milestone not found");
    }
    
    return updatedMilestone;
  }

  async getProgress(userId: number): Promise<Progress[]> {
    return db
      .select()
      .from(progress)
      .where(eq(progress.userId, userId));
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const [progressEntry] = await db
      .insert(progress)
      .values(insertProgress)
      .returning();
    
    return progressEntry;
  }

  async updateProgress(id: number, percentage: number): Promise<Progress> {
    const [updatedProgress] = await db
      .update(progress)
      .set({
        percentage,
        lastUpdated: new Date()
      })
      .where(eq(progress.id, id))
      .returning();
    
    if (!updatedProgress) {
      throw new Error("Progress not found");
    }
    
    return updatedProgress;
  }

  async getArticleProgress(userId: number): Promise<ArticleProgress[]> {
    return db
      .select()
      .from(articleProgress)
      .where(eq(articleProgress.userId, userId));
  }

  async markArticleCompleted(userId: number, articleId: string): Promise<ArticleProgress> {
    // Check if progress already exists
    const [existingProgress] = await db
      .select()
      .from(articleProgress)
      .where(
        and(
          eq(articleProgress.userId, userId),
          eq(articleProgress.articleId, articleId)
        )
      );
    
    if (existingProgress) {
      const [updatedProgress] = await db
        .update(articleProgress)
        .set({
          completed: true,
          lastUpdated: new Date()
        })
        .where(eq(articleProgress.id, existingProgress.id))
        .returning();
      
      return updatedProgress;
    }
    
    // Create new progress
    const [newProgress] = await db
      .insert(articleProgress)
      .values({
        userId,
        articleId,
        completed: true,
        lastUpdated: new Date()
      })
      .returning();
    
    return newProgress;
  }
}

export const storage = new DatabaseStorage();
