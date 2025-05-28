import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  age: integer("age"),
  gender: text("gender"),
  location: text("location"),
  recoveryGoal: text("recovery_goal"),
  joinDate: timestamp("join_date").notNull().defaultNow(),
  streakRecord: integer("streak_record").default(0),
});

export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  startDate: timestamp("start_date").notNull().defaultNow(),
  currentStreak: integer("current_streak").notNull().default(0),
  bestStreak: integer("best_streak").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const reasons = pgTable("reasons", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const forumPosts = pgTable("forum_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const forumComments = pgTable("forum_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: integer("user_id").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  days: integer("days").notNull(),
  achieved: boolean("achieved").notNull().default(false),
  achievedDate: timestamp("achieved_date"),
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  benefit: text("benefit").notNull(),
  percentage: integer("percentage").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const articleProgress = pgTable("article_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  articleId: text("article_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertStreakSchema = createInsertSchema(streaks).pick({
  userId: true,
  startDate: true,
  currentStreak: true,
  bestStreak: true,
});

export const insertReasonSchema = createInsertSchema(reasons).pick({
  userId: true,
  reason: true,
});

export const insertForumPostSchema = createInsertSchema(forumPosts).pick({
  userId: true,
  title: true,
  content: true,
});

export const insertForumCommentSchema = createInsertSchema(forumComments).pick({
  postId: true,
  userId: true,
  content: true,
});

export const insertMilestoneSchema = createInsertSchema(milestones).pick({
  userId: true,
  days: true,
  achieved: true,
});

export const insertProgressSchema = createInsertSchema(progress).pick({
  userId: true,
  benefit: true,
  percentage: true,
});

export const insertArticleProgressSchema = createInsertSchema(articleProgress).pick({
  userId: true,
  articleId: true,
  completed: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = z.infer<typeof insertStreakSchema>;

export type Reason = typeof reasons.$inferSelect;
export type InsertReason = z.infer<typeof insertReasonSchema>;

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;

export type ForumComment = typeof forumComments.$inferSelect;
export type InsertForumComment = z.infer<typeof insertForumCommentSchema>;

export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;

export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;

export type ArticleProgress = typeof articleProgress.$inferSelect;
export type InsertArticleProgress = z.infer<typeof insertArticleProgressSchema>;
