import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { IStorage } from "./storage";
import {
  users,
  type User,
  type InsertUser,
  portfolioContent,
  type PortfolioContent,
  skills,
  type Skill,
  type InsertSkill,
  experiences,
  type Experience,
  type InsertExperience,
  projects,
  type Project,
  type InsertProject,
  contactMessages,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export class DatabaseStorage implements IStorage {
  // User operations
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

  // Portfolio content operations
  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    const [content] = await db.select().from(portfolioContent).where(eq(portfolioContent.section, section));
    return content;
  }

  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    return await db.select().from(portfolioContent);
  }

  async updatePortfolioContent(section: string, content: any): Promise<PortfolioContent> {
    const existingContent = await this.getPortfolioContent(section);

    if (existingContent) {
      const [updatedContent] = await db
        .update(portfolioContent)
        .set({ 
          content,
          lastUpdated: new Date(),
        })
        .where(eq(portfolioContent.id, existingContent.id))
        .returning();
      return updatedContent;
    } else {
      const [newContent] = await db
        .insert(portfolioContent)
        .values({
          section,
          content,
          lastUpdated: new Date(),
        })
        .returning();
      return newContent;
    }
  }

  // Skills operations
  async getAllSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return await db.select().from(skills).where(eq(skills.category, category));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(skill).returning();
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const [updatedSkill] = await db
      .update(skills)
      .set(skill)
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(id: number): Promise<boolean> {
    await db.delete(skills).where(eq(skills.id, id));
    return true;
  }

  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(experiences.order);
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(experience).returning();
    return newExperience;
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const [updatedExperience] = await db
      .update(experiences)
      .set(experience)
      .where(eq(experiences.id, id))
      .returning();
    return updatedExperience;
  }

  async deleteExperience(id: number): Promise<boolean> {
    await db.delete(experiences).where(eq(experiences.id, id));
    return true;
  }

  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isVisible, true) && eq(projects.isFeatured, true));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    await db.delete(projects).where(eq(projects.id, id));
    return true;
  }

  // Contact message operations
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db
      .insert(contactMessages)
      .values({
        ...message,
        createdAt: new Date(),
        isRead: false,
      })
      .returning();
    return newMessage;
  }

  async markMessageAsRead(id: number): Promise<boolean> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
    return true;
  }

  async deleteContactMessage(id: number): Promise<boolean> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
    return true;
  }
}