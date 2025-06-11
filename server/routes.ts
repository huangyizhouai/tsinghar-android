import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateArticleContent } from "./openai-service";
import { z } from "zod";
import { 
  insertReasonSchema, 
  insertForumPostSchema,
  insertForumCommentSchema,
  loginSchema,
  signupSchema
} from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";

export async function registerRoutes(app: Express): Promise<Server> {
  // Session setup
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    tableName: "sessions",
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'development-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));

  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = loginSchema.parse(req.body);
      
      // Hardcoded test account for development/testing
      if (username === "test" && password === "test123") {
        (req.session as any).userId = 999; // Special test user ID
        return res.json({ 
          success: true, 
          user: { 
            id: 999, 
            username: "test",
            email: "test@example.com" 
          } 
        });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      (req.session as any).userId = user.id;
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username,
          email: user.email 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = signupSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const user = await storage.createUser(userData);
      (req.session as any).userId = user.id;
      
      res.json({ 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username,
          email: user.email 
        } 
      });
    } catch (error) {
      res.status(400).json({ message: "Invalid request data" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/auth/user", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Handle test account
    if (userId === 999) {
      return res.json({ 
        id: 999, 
        username: "test",
        email: "test@example.com" 
      });
    }

    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ 
        id: user.id, 
        username: user.username,
        email: user.email 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  // API routes
  
  // Get current user streak
  app.get("/api/streak", async (req, res) => {
    try {
      const sessionUserId = (req.session as any)?.userId;
      
      // Handle test account
      if (sessionUserId === 999) {
        return res.json({
          id: 1,
          userId: 999,
          currentStreak: 5,
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
      
      const userId = sessionUserId || 1; // Default user for backwards compatibility
      const streak = await storage.getStreak(userId);
      
      if (!streak) {
        return res.status(404).json({ message: "Streak not found" });
      }
      
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: "Failed to get streak" });
    }
  });
  
  // Reset streak
  app.post("/api/streak/reset", async (req, res) => {
    try {
      const userId = 1; // Default user
      const streak = await storage.resetStreak(userId);
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: "Failed to reset streak" });
    }
  });
  
  // Get reasons
  app.get("/api/reasons", async (req, res) => {
    try {
      const userId = 1; // Default user
      const reasons = await storage.getReasons(userId);
      res.json(reasons);
    } catch (error) {
      res.status(500).json({ message: "Failed to get reasons" });
    }
  });
  
  // Add reason
  app.post("/api/reasons", async (req, res) => {
    try {
      const userId = 1; // Default user
      const data = insertReasonSchema.parse({ ...req.body, userId });
      const reason = await storage.addReason(data);
      res.json(reason);
    } catch (error) {
      res.status(500).json({ message: "Failed to add reason" });
    }
  });
  
  // Delete reason
  app.delete("/api/reasons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReason(id);
      
      if (!success) {
        return res.status(404).json({ message: "Reason not found" });
      }
      
      res.json({ success });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete reason" });
    }
  });
  
  // Get forum posts
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await storage.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get posts" });
    }
  });
  
  // Get user's own posts
  app.get("/api/posts/my", async (req, res) => {
    try {
      const userId = 1; // Default user
      const posts = await storage.getUserPosts(userId);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user posts" });
    }
  });
  
  // Get single post
  app.get("/api/posts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to get post" });
    }
  });
  
  // Create post
  app.post("/api/posts", async (req, res) => {
    try {
      const userId = 1; // Default user
      const data = insertForumPostSchema.parse({ ...req.body, userId });
      const post = await storage.createPost(data);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create post" });
    }
  });
  
  // Upvote post
  app.post("/api/posts/:id/upvote", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.upvotePost(id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to upvote post" });
    }
  });
  
  // Get post comments
  app.get("/api/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const comments = await storage.getPostComments(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to get comments" });
    }
  });
  
  // Add comment to post
  app.post("/api/posts/:id/comments", async (req, res) => {
    try {
      const postId = parseInt(req.params.id);
      const userId = 1; // Default user
      const data = insertForumCommentSchema.parse({ ...req.body, postId, userId });
      const comment = await storage.addComment(data);
      res.json(comment);
    } catch (error) {
      res.status(500).json({ message: "Failed to add comment" });
    }
  });
  
  // Get milestones
  app.get("/api/milestones", async (req, res) => {
    try {
      const userId = 1; // Default user
      
      // Get current streak to update milestone progress
      const streak = await storage.getStreak(userId);
      const currentDays = streak?.currentStreak || 0;
      
      const milestones = await storage.getMilestones(userId);
      
      // Update milestone achievements based on current streak
      for (const milestone of milestones) {
        const shouldBeAchieved = currentDays >= milestone.days;
        if (shouldBeAchieved !== milestone.achieved) {
          await storage.updateMilestone(milestone.id, shouldBeAchieved);
        }
      }
      
      // Get updated milestones
      const updatedMilestones = await storage.getMilestones(userId);
      res.json(updatedMilestones);
    } catch (error) {
      res.status(500).json({ message: "Failed to get milestones" });
    }
  });
  
  // Get progress
  app.get("/api/progress", async (req, res) => {
    try {
      const userId = 1; // Default user
      const progress = await storage.getProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get progress" });
    }
  });
  
  // Mark article as completed
  app.post("/api/articles/:id/complete", async (req, res) => {
    try {
      const articleId = req.params.id;
      const userId = 1; // Default user
      const progress = await storage.markArticleCompleted(userId, articleId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark article as completed" });
    }
  });
  
  // Get article progress
  app.get("/api/articles/progress", async (req, res) => {
    try {
      const userId = 1; // Default user
      const progress = await storage.getArticleProgress(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get article progress" });
    }
  });
  
  // Get user profile
  app.get("/api/profile", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      // Handle test account
      if (userId === 999) {
        return res.json({
          id: 999,
          username: "test",
          email: "test@example.com",
          password: "test123",
          age: 25,
          gender: "Male",
          location: "Test City",
          recoveryGoal: "Testing the app",
          joinDate: new Date().toISOString(),
          streakRecord: 10
        });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to get profile" });
    }
  });
  
  // Update user profile
  app.put("/api/profile", async (req, res) => {
    try {
      const userId = (req.session as any)?.userId;
      if (!userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      
      const { age, gender, location, recoveryGoal } = req.body;
      
      const updatedUser = await storage.updateUser(userId, {
        age,
        gender,
        location,
        recoveryGoal
      });
      
      res.json(updatedUser);
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Generate article content
  app.post("/api/articles/generate", async (req, res) => {
    try {
      const { topic, category } = req.body;
      
      if (!topic || !category) {
        return res.status(400).json({ message: "Topic and category are required" });
      }
      
      const articleContent = await generateArticleContent(topic, category);
      res.json(articleContent);
    } catch (error) {
      console.error("Failed to generate article:", error);
      res.status(500).json({ message: "Failed to generate article content" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
