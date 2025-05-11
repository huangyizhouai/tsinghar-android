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

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private streaks: Map<number, Streak>;
  private reasons: Map<number, Reason>;
  private forumPosts: Map<number, ForumPost>;
  private forumComments: Map<number, ForumComment>;
  private milestones: Map<number, Milestone>;
  private progressData: Map<number, Progress>;
  private articleProgressData: Map<number, ArticleProgress>;
  
  currentUserId: number;
  currentStreakId: number;
  currentReasonId: number;
  currentPostId: number;
  currentCommentId: number;
  currentMilestoneId: number;
  currentProgressId: number;
  currentArticleProgressId: number;

  constructor() {
    this.users = new Map();
    this.streaks = new Map();
    this.reasons = new Map();
    this.forumPosts = new Map();
    this.forumComments = new Map();
    this.milestones = new Map();
    this.progressData = new Map();
    this.articleProgressData = new Map();
    
    this.currentUserId = 1;
    this.currentStreakId = 1;
    this.currentReasonId = 1;
    this.currentPostId = 1;
    this.currentCommentId = 1;
    this.currentMilestoneId = 1;
    this.currentProgressId = 1;
    this.currentArticleProgressId = 1;

    // Create default user
    this.createUser({ username: "default", password: "password" });
    
    // Initialize with some data
    const userId = 1;
    
    // Create default streak
    this.createStreak({
      userId,
      startDate: new Date(),
      currentStreak: 2,
      bestStreak: 14
    });
    
    // Add some reasons
    this.addReason({ userId, reason: "To improve my mental clarity" });
    this.addReason({ userId, reason: "To be more productive" });
    this.addReason({ userId, reason: "To have better relationships" });
    
    // Add milestones
    this.createMilestone({ userId, days: 1, achieved: true });
    this.createMilestone({ userId, days: 7, achieved: false });
    this.createMilestone({ userId, days: 30, achieved: false });
    this.createMilestone({ userId, days: 90, achieved: false });
    
    // Add progress benefits
    this.createProgress({ userId, benefit: "Improved Confidence", percentage: 2 });
    this.createProgress({ userId, benefit: "Mental Clarity", percentage: 1 });
    this.createProgress({ userId, benefit: "Better Sleep", percentage: 3 });
    this.createProgress({ userId, benefit: "Increased Productivity", percentage: 1 });
    
    // Add some forum posts
    this.createPost({
      userId,
      title: "I reached 90 days - Here's what changed",
      content: "After three months of staying clean, I wanted to share my experience and the benefits I've noticed physically and mentally..."
    });
    
    this.createPost({
      userId,
      title: "Need serious help - feeling low",
      content: "I'm really struggling today. Had a stressful week at work and the urges are stronger than ever. Any advice on getting through this?"
    });
    
    this.createPost({
      userId,
      title: "Weekly accountability check-in",
      content: "Hey everyone, it's Sunday - time for our weekly check-in. How did you do this week? Any challenges, victories or goals for next week?"
    });
    
    this.createPost({
      userId,
      title: "Book recommendation: Your Brain on Porn",
      content: "Just finished reading \"Your Brain on Porn\" by Gary Wilson. Highly recommend it - it explains the science behind addiction in accessible ways..."
    });
    
    // Upvote posts to different counts
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    this.upvotePost(1);
    
    this.upvotePost(2);
    this.upvotePost(2);
    this.upvotePost(2);
    
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    this.upvotePost(3);
    
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
    this.upvotePost(4);
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Streak methods
  async getStreak(userId: number): Promise<Streak | undefined> {
    return Array.from(this.streaks.values()).find(
      (streak) => streak.userId === userId,
    );
  }

  async createStreak(insertStreak: InsertStreak): Promise<Streak> {
    const id = this.currentStreakId++;
    const streak: Streak = { 
      ...insertStreak, 
      id,
      lastUpdated: new Date() 
    };
    this.streaks.set(id, streak);
    return streak;
  }

  async updateStreak(userId: number, days: number): Promise<Streak> {
    const streak = await this.getStreak(userId);
    if (!streak) {
      throw new Error("Streak not found");
    }
    
    const updatedStreak: Streak = {
      ...streak,
      currentStreak: days,
      bestStreak: Math.max(streak.bestStreak, days),
      lastUpdated: new Date()
    };
    
    this.streaks.set(streak.id, updatedStreak);
    return updatedStreak;
  }

  async resetStreak(userId: number): Promise<Streak> {
    const streak = await this.getStreak(userId);
    if (!streak) {
      throw new Error("Streak not found");
    }
    
    const updatedStreak: Streak = {
      ...streak,
      currentStreak: 0,
      startDate: new Date(),
      lastUpdated: new Date()
    };
    
    this.streaks.set(streak.id, updatedStreak);
    return updatedStreak;
  }

  // Reasons methods
  async getReasons(userId: number): Promise<Reason[]> {
    return Array.from(this.reasons.values()).filter(
      (reason) => reason.userId === userId,
    );
  }

  async addReason(insertReason: InsertReason): Promise<Reason> {
    const id = this.currentReasonId++;
    const reason: Reason = { 
      ...insertReason, 
      id,
      createdAt: new Date() 
    };
    this.reasons.set(id, reason);
    return reason;
  }

  async deleteReason(id: number): Promise<boolean> {
    return this.reasons.delete(id);
  }

  // Forum methods
  async getAllPosts(): Promise<ForumPost[]> {
    return Array.from(this.forumPosts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getPost(id: number): Promise<ForumPost | undefined> {
    return this.forumPosts.get(id);
  }

  async createPost(insertPost: InsertForumPost): Promise<ForumPost> {
    const id = this.currentPostId++;
    const post: ForumPost = { 
      ...insertPost, 
      id,
      upvotes: 0,
      createdAt: new Date() 
    };
    this.forumPosts.set(id, post);
    return post;
  }

  async upvotePost(id: number): Promise<ForumPost> {
    const post = await this.getPost(id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    const updatedPost: ForumPost = {
      ...post,
      upvotes: post.upvotes + 1
    };
    
    this.forumPosts.set(id, updatedPost);
    return updatedPost;
  }

  async getPostComments(postId: number): Promise<ForumComment[]> {
    return Array.from(this.forumComments.values())
      .filter((comment) => comment.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async addComment(insertComment: InsertForumComment): Promise<ForumComment> {
    const id = this.currentCommentId++;
    const comment: ForumComment = { 
      ...insertComment, 
      id,
      createdAt: new Date() 
    };
    this.forumComments.set(id, comment);
    return comment;
  }

  // Milestones methods
  async getMilestones(userId: number): Promise<Milestone[]> {
    return Array.from(this.milestones.values())
      .filter((milestone) => milestone.userId === userId)
      .sort((a, b) => a.days - b.days);
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const id = this.currentMilestoneId++;
    const milestone: Milestone = { 
      ...insertMilestone, 
      id,
      achievedDate: insertMilestone.achieved ? new Date() : undefined
    };
    this.milestones.set(id, milestone);
    return milestone;
  }

  async updateMilestone(id: number, achieved: boolean): Promise<Milestone> {
    const milestone = this.milestones.get(id);
    if (!milestone) {
      throw new Error("Milestone not found");
    }
    
    const updatedMilestone: Milestone = {
      ...milestone,
      achieved,
      achievedDate: achieved ? new Date() : undefined
    };
    
    this.milestones.set(id, updatedMilestone);
    return updatedMilestone;
  }

  // Progress methods
  async getProgress(userId: number): Promise<Progress[]> {
    return Array.from(this.progressData.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const id = this.currentProgressId++;
    const progress: Progress = { 
      ...insertProgress, 
      id,
      lastUpdated: new Date() 
    };
    this.progressData.set(id, progress);
    return progress;
  }

  async updateProgress(id: number, percentage: number): Promise<Progress> {
    const progress = this.progressData.get(id);
    if (!progress) {
      throw new Error("Progress not found");
    }
    
    const updatedProgress: Progress = {
      ...progress,
      percentage,
      lastUpdated: new Date()
    };
    
    this.progressData.set(id, updatedProgress);
    return updatedProgress;
  }

  // Article progress methods
  async getArticleProgress(userId: number): Promise<ArticleProgress[]> {
    return Array.from(this.articleProgressData.values()).filter(
      (progress) => progress.userId === userId,
    );
  }

  async markArticleCompleted(userId: number, articleId: string): Promise<ArticleProgress> {
    // Check if progress already exists
    const existingProgress = Array.from(this.articleProgressData.values()).find(
      (progress) => progress.userId === userId && progress.articleId === articleId
    );
    
    if (existingProgress) {
      const updatedProgress: ArticleProgress = {
        ...existingProgress,
        completed: true,
        lastUpdated: new Date()
      };
      
      this.articleProgressData.set(existingProgress.id, updatedProgress);
      return updatedProgress;
    }
    
    // Create new progress
    const id = this.currentArticleProgressId++;
    const progress: ArticleProgress = {
      id,
      userId,
      articleId,
      completed: true,
      lastUpdated: new Date()
    };
    
    this.articleProgressData.set(id, progress);
    return progress;
  }
}

export const storage = new MemStorage();
