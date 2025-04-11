import { pgTable, text, serial, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Base user schema from template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Portfolio content schema
export const portfolioContent = pgTable("portfolio_content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull(),
  content: jsonb("content").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export const insertPortfolioContentSchema = createInsertSchema(portfolioContent).pick({
  section: true,
  content: true,
});

export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;
export type PortfolioContent = typeof portfolioContent.$inferSelect;

// Skills schema
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  proficiency: integer("proficiency").notNull(),
  isVisible: boolean("is_visible").default(true).notNull(),
});

export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  category: true,
  proficiency: true,
  isVisible: true,
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

// Experiences schema
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isVisible: boolean("is_visible").default(true).notNull(),
  order: integer("order").notNull(),
});

export const insertExperienceSchema = createInsertSchema(experiences).pick({
  position: true,
  company: true,
  description: true,
  startDate: true,
  endDate: true,
  isVisible: true,
  order: true,
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type Experience = typeof experiences.$inferSelect;

// Projects schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array().notNull(),
  repoUrl: text("repo_url"),
  demoUrl: text("demo_url"),
  isVisible: boolean("is_visible").default(true).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  tags: true,
  repoUrl: true,
  demoUrl: true,
  isVisible: true,
  isFeatured: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isRead: boolean("is_read").default(false).notNull(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;
