import { z } from "zod";

// User interface
export interface User {
  id: number;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Portfolio content interface
export interface PortfolioContent {
  id: number;
  section: string;
  content: any;
  lastUpdated: string;
}

export const insertPortfolioContentSchema = z.object({
  section: z.string(),
  content: z.any(),
});

export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;

// Skills interface
export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  isVisible: boolean;
}

export const insertSkillSchema = z.object({
  name: z.string(),
  category: z.string(),
  proficiency: z.number(),
  isVisible: z.boolean().default(true),
});

export type InsertSkill = z.infer<typeof insertSkillSchema>;

// Experiences interface
export interface Experience {
  id: number;
  position: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
  isVisible: boolean;
  order: number;
}

export const insertExperienceSchema = z.object({
  position: z.string(),
  company: z.string(),
  description: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isVisible: z.boolean().default(true),
  order: z.number(),
});

export type InsertExperience = z.infer<typeof insertExperienceSchema>;

// Projects interface
export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  isVisible: boolean;
  isFeatured: boolean;
}

export const insertProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  repoUrl: z.string().optional(),
  demoUrl: z.string().optional(),
  isVisible: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;

// Contact messages interface
export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export const insertContactMessageSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
