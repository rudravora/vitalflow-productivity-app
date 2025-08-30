import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  currentMood: text("current_mood").notNull().default("focused"),
  energyLevel: integer("energy_level").notNull().default(75),
  tipsLearned: integer("tips_learned").notNull().default(0),
  streakDays: integer("streak_days").notNull().default(1),
  habitsBuilt: integer("habits_built").notNull().default(0),
  productivityScore: integer("productivity_score").notNull().default(750),
  gardenPlants: jsonb("garden_plants").notNull().default([]),
  achievements: jsonb("achievements").notNull().default([]),
  lastActive: timestamp("last_active").notNull().defaultNow(),
});

export const habits = pgTable("habits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  progress: integer("progress").notNull().default(0),
  target: integer("target").notNull().default(7),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productivityTips = pgTable("productivity_tips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  mood: text("mood").notNull(),
  category: text("category").notNull(),
  text: text("text").notNull(),
  difficulty: text("difficulty").notNull(),
  timesSaved: text("times_saved"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastActive: true,
});

export const insertHabitSchema = createInsertSchema(habits).omit({
  id: true,
  createdAt: true,
});

export const insertProductivityTipSchema = createInsertSchema(productivityTips).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertHabit = z.infer<typeof insertHabitSchema>;
export type Habit = typeof habits.$inferSelect;
export type InsertProductivityTip = z.infer<typeof insertProductivityTipSchema>;
export type ProductivityTip = typeof productivityTips.$inferSelect;
