import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, insertHabitSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const progress = await storage.getUserProgress(userId);
      
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }
      
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user progress" });
    }
  });

  // Update user progress
  app.patch("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('Progress update request:', { userId, body: req.body });
      
      const updateData = insertUserProgressSchema.partial().parse(req.body);
      const progress = await storage.updateUserProgress(userId, updateData);
      
      console.log('Updated progress:', progress);
      res.json(progress);
    } catch (error) {
      console.error('Error updating progress:', error);
      res.status(500).json({ 
        message: "Failed to update user progress",
        details: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Get productivity tips by mood
  app.get("/api/tips/:mood", async (req, res) => {
    try {
      const { mood } = req.params;
      const tips = await storage.getProductivityTipsByMood(mood);
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to get productivity tips" });
    }
  });

  // Get all productivity tips
  app.get("/api/tips", async (req, res) => {
    try {
      const tips = await storage.getProductivityTips();
      res.json(tips);
    } catch (error) {
      res.status(500).json({ message: "Failed to get productivity tips" });
    }
  });

  // Get user habits
  app.get("/api/habits/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const habits = await storage.getUserHabits(userId);
      res.json(habits);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user habits" });
    }
  });

  // Create new habit
  app.post("/api/habits", async (req, res) => {
    try {
      const habitData = insertHabitSchema.parse(req.body);
      const habit = await storage.createHabit(habitData);
      res.json(habit);
    } catch (error) {
      res.status(500).json({ message: "Failed to create habit" });
    }
  });

  // Update habit progress
  app.patch("/api/habits/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = insertHabitSchema.partial().parse(req.body);
      
      const habit = await storage.updateHabit(id, updateData);
      res.json(habit);
    } catch (error) {
      res.status(500).json({ message: "Failed to update habit" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
