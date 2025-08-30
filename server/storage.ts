import { type User, type InsertUser, type UserProgress, type InsertUserProgress, type Habit, type InsertHabit, type ProductivityTip, type InsertProductivityTip } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  getUserHabits(userId: string): Promise<Habit[]>;
  createHabit(habit: InsertHabit): Promise<Habit>;
  updateHabit(id: string, habit: Partial<InsertHabit>): Promise<Habit>;
  
  getProductivityTips(): Promise<ProductivityTip[]>;
  getProductivityTipsByMood(mood: string): Promise<ProductivityTip[]>;
  createProductivityTip(tip: InsertProductivityTip): Promise<ProductivityTip>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private userProgress: Map<string, UserProgress>;
  private habits: Map<string, Habit>;
  private productivityTips: Map<string, ProductivityTip>;

  constructor() {
    this.users = new Map();
    this.userProgress = new Map();
    this.habits = new Map();
    this.productivityTips = new Map();
    this.seedData();
  }

  private seedData() {
    // Create demo user
    const demoUserId = "demo-user";
    const demoUser: User = {
      id: demoUserId,
      username: "demo",
      password: "demo"
    };
    this.users.set(demoUserId, demoUser);
    
    // Create demo user progress
    const demoProgressId = randomUUID();
    const demoProgress: UserProgress = {
      id: demoProgressId,
      userId: demoUserId,
      currentMood: "focused",
      energyLevel: 75,
      tipsLearned: 0,
      streakDays: 1,
      habitsBuilt: 0,
      productivityScore: 750,
      gardenPlants: ["🌱"],
      achievements: ["🌱"],
      lastActive: new Date()
    };
    this.userProgress.set(demoProgressId, demoProgress);

    // Seed productivity tips
    const tips = [
      { mood: "stressed", category: "Stress Management", text: "Take 3 deep breaths before starting any task. This simple technique reduces cortisol levels and improves focus.", difficulty: "Beginner", timesSaved: "5 mins/day" },
      { mood: "stressed", category: "Mental Clarity", text: "Use the 'Brain Dump' technique: Write down everything on your mind for 5 minutes to clear mental clutter.", difficulty: "Beginner", timesSaved: "15 mins/day" },
      { mood: "stressed", category: "Mindfulness", text: "Practice the 5-4-3-2-1 grounding technique: Notice 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.", difficulty: "Intermediate", timesSaved: "10 mins/day" },
      { mood: "motivated", category: "Energy Management", text: "Channel your motivation with the 'Power Hour': Tackle your most challenging task when energy is highest.", difficulty: "Intermediate", timesSaved: "30 mins/day" },
      { mood: "motivated", category: "Psychology", text: "Create a 'Victory Ritual': Celebrate small wins immediately to maintain motivation momentum.", difficulty: "Beginner", timesSaved: "Build momentum" },
      { mood: "motivated", category: "Task Management", text: "Use the 'Motivation Multiplier': Pair exciting tasks with boring ones to maintain high energy.", difficulty: "Advanced", timesSaved: "45 mins/day" },
      { mood: "focused", category: "Deep Work", text: "Implement the 'Focus Fortress': Remove all distractions from your workspace for 90 minutes of deep work.", difficulty: "Intermediate", timesSaved: "60 mins/day" },
      { mood: "focused", category: "Digital Focus", text: "Use the 'Single-Tab Rule': Keep only one browser tab open while working on focused tasks.", difficulty: "Beginner", timesSaved: "20 mins/day" },
      { mood: "focused", category: "Concentration", text: "Practice 'Attention Anchoring': Choose one specific object to return your focus to when mind wanders.", difficulty: "Advanced", timesSaved: "40 mins/day" },
      { mood: "creative", category: "Creativity", text: "Try the 'Random Word' technique: Pick a random word and connect it to your creative challenge.", difficulty: "Beginner", timesSaved: "Break creative blocks" },
      { mood: "creative", category: "Inspiration", text: "Use 'Walking Meditation': Take a 10-minute walk without devices to stimulate creative thinking.", difficulty: "Beginner", timesSaved: "Generate new ideas" },
      { mood: "creative", category: "Innovation", text: "Practice 'Constraint Creativity': Set artificial limitations to spark innovative solutions.", difficulty: "Advanced", timesSaved: "Faster ideation" },
      { mood: "overwhelmed", category: "Simplification", text: "Use the 'One Thing' rule: Focus on completing just one small task to regain control.", difficulty: "Beginner", timesSaved: "Reduce anxiety" },
      { mood: "overwhelmed", category: "Prioritization", text: "Practice 'Triage Thinking': Categorize tasks as Critical, Important, or Nice-to-Have.", difficulty: "Intermediate", timesSaved: "30 mins/day" },
      { mood: "overwhelmed", category: "Time Management", text: "Implement 'Time Boxing': Allocate fixed time periods for each task to prevent over-commitment.", difficulty: "Advanced", timesSaved: "60 mins/day" }
    ];

    tips.forEach(tip => {
      const id = randomUUID();
      this.productivityTips.set(id, { ...tip, id });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Create initial user progress
    await this.createUserProgress({
      userId: id,
      currentMood: "focused",
      energyLevel: 75,
      tipsLearned: 0,
      streakDays: 1,
      habitsBuilt: 0,
      productivityScore: 750,
      gardenPlants: ["🌱"],
      achievements: ["🌱"]
    });
    
    return user;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      (progress) => progress.userId === userId
    );
  }

  async updateUserProgress(userId: string, progressUpdate: Partial<InsertUserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgress(userId);
    if (!existing) {
      throw new Error("User progress not found");
    }
    
    const updated: UserProgress = {
      ...existing,
      ...progressUpdate,
      lastActive: new Date()
    };
    
    this.userProgress.set(existing.id, updated);
    return updated;
  }

  async createUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const userProgress: UserProgress = {
      id,
      userId: progress.userId,
      currentMood: progress.currentMood || "focused",
      energyLevel: progress.energyLevel || 75,
      tipsLearned: progress.tipsLearned || 0,
      streakDays: progress.streakDays || 1,
      habitsBuilt: progress.habitsBuilt || 0,
      productivityScore: progress.productivityScore || 750,
      gardenPlants: progress.gardenPlants || ["🌱"],
      achievements: progress.achievements || ["🌱"],
      lastActive: new Date()
    };
    this.userProgress.set(id, userProgress);
    return userProgress;
  }

  async getUserHabits(userId: string): Promise<Habit[]> {
    return Array.from(this.habits.values()).filter(
      (habit) => habit.userId === userId && habit.isActive
    );
  }

  async createHabit(habit: InsertHabit): Promise<Habit> {
    const id = randomUUID();
    const newHabit: Habit = {
      id,
      userId: habit.userId,
      name: habit.name,
      progress: habit.progress || 0,
      target: habit.target || 7,
      isActive: habit.isActive !== undefined ? habit.isActive : true,
      createdAt: new Date()
    };
    this.habits.set(id, newHabit);
    return newHabit;
  }

  async updateHabit(id: string, habitUpdate: Partial<InsertHabit>): Promise<Habit> {
    const existing = this.habits.get(id);
    if (!existing) {
      throw new Error("Habit not found");
    }
    
    const updated: Habit = { ...existing, ...habitUpdate };
    this.habits.set(id, updated);
    return updated;
  }

  async getProductivityTips(): Promise<ProductivityTip[]> {
    return Array.from(this.productivityTips.values());
  }

  async getProductivityTipsByMood(mood: string): Promise<ProductivityTip[]> {
    return Array.from(this.productivityTips.values()).filter(
      (tip) => tip.mood === mood
    );
  }

  async createProductivityTip(tip: InsertProductivityTip): Promise<ProductivityTip> {
    const id = randomUUID();
    const newTip: ProductivityTip = { 
      id,
      mood: tip.mood,
      category: tip.category,
      text: tip.text,
      difficulty: tip.difficulty,
      timesSaved: tip.timesSaved || null
    };
    this.productivityTips.set(id, newTip);
    return newTip;
  }
}

export const storage = new MemStorage();
