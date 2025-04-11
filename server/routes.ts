import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertContactMessageSchema,
  insertExperienceSchema,
  insertProjectSchema,
  insertSkillSchema,
} from "@shared/schema";
import { Octokit } from "octokit";
import multer from "multer";
import path from "path";
import fs from "fs";

// GitHub API client setup
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

// Multer setup for file uploads
const storage_config = multer.diskStorage({
  destination: function (_, file, cb) {
    const uploadPath = path.join(process.cwd(), "dist", "public", "uploads");
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (_, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and PDF files are allowed."));
    }
  }
});

// Auth middleware
const requireAuth = (req: Request, res: Response, next: Function) => {
  // In a real app, this would check for a valid session
  // For this demo, we'll use a simple authorization header check
  const authHeader = req.headers.authorization;
  
  if (!authHeader || authHeader !== "Bearer admin123") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // API Routes
  // Public routes
  
  // Get portfolio content (all sections)
  app.get("/api/content", async (_, res) => {
    try {
      const content = await storage.getAllPortfolioContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });
  
  // Get specific portfolio content section
  app.get("/api/content/:section", async (req, res) => {
    try {
      const section = req.params.section;
      const content = await storage.getPortfolioContent(section);
      
      if (!content) {
        return res.status(404).json({ message: "Content section not found" });
      }
      
      res.json(content);
    } catch (error) {
      console.error(`Error fetching ${req.params.section} content:`, error);
      res.status(500).json({ message: "Failed to fetch content section" });
    }
  });
  
  // Get all skills
  app.get("/api/skills", async (_, res) => {
    try {
      const skills = await storage.getAllSkills();
      const visibleSkills = skills.filter(skill => skill.isVisible);
      res.json(visibleSkills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });
  
  // Get skills by category
  app.get("/api/skills/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const skills = await storage.getSkillsByCategory(category);
      const visibleSkills = skills.filter(skill => skill.isVisible);
      res.json(visibleSkills);
    } catch (error) {
      console.error(`Error fetching ${req.params.category} skills:`, error);
      res.status(500).json({ message: "Failed to fetch skills category" });
    }
  });
  
  // Get all experiences
  app.get("/api/experiences", async (_, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      const visibleExperiences = experiences.filter(exp => exp.isVisible);
      res.json(visibleExperiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });
  
  // Get all projects
  app.get("/api/projects", async (_, res) => {
    try {
      const projects = await storage.getAllProjects();
      const visibleProjects = projects.filter(project => project.isVisible);
      res.json(visibleProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  // Get featured projects
  app.get("/api/projects/featured", async (_, res) => {
    try {
      const featuredProjects = await storage.getFeaturedProjects();
      res.json(featuredProjects);
    } catch (error) {
      console.error("Error fetching featured projects:", error);
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  
  // Get GitHub repositories
  app.get("/api/github/repos", async (_, res) => {
    try {
      const { data: repos } = await octokit.rest.repos.listForUser({
        username: "assisberlanda",
        sort: "updated",
        per_page: 10
      });
      
      res.json(repos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      }
      
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Protected admin routes
  
  // Update portfolio content
  app.put("/api/admin/content/:section", requireAuth, async (req, res) => {
    try {
      const section = req.params.section;
      const content = req.body;
      
      const updatedContent = await storage.updatePortfolioContent(section, content);
      res.json(updatedContent);
    } catch (error) {
      console.error(`Error updating ${req.params.section} content:`, error);
      res.status(500).json({ message: "Failed to update content section" });
    }
  });
  
  // Create skill
  app.post("/api/admin/skills", requireAuth, async (req, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.status(201).json(skill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid skill data", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating skill:", error);
      res.status(500).json({ message: "Failed to create skill" });
    }
  });
  
  // Update skill
  app.put("/api/admin/skills/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertSkillSchema.partial().parse(req.body);
      
      const updatedSkill = await storage.updateSkill(id, validatedData);
      
      if (!updatedSkill) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.json(updatedSkill);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid skill data", 
          errors: error.errors 
        });
      }
      
      console.error(`Error updating skill ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update skill" });
    }
  });
  
  // Delete skill
  app.delete("/api/admin/skills/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteSkill(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Skill not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error(`Error deleting skill ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });
  
  // Create experience
  app.post("/api/admin/experiences", requireAuth, async (req, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.status(201).json(experience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid experience data", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating experience:", error);
      res.status(500).json({ message: "Failed to create experience" });
    }
  });
  
  // Update experience
  app.put("/api/admin/experiences/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertExperienceSchema.partial().parse(req.body);
      
      const updatedExperience = await storage.updateExperience(id, validatedData);
      
      if (!updatedExperience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      
      res.json(updatedExperience);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid experience data", 
          errors: error.errors 
        });
      }
      
      console.error(`Error updating experience ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update experience" });
    }
  });
  
  // Delete experience
  app.delete("/api/admin/experiences/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteExperience(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Experience not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error(`Error deleting experience ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to delete experience" });
    }
  });
  
  // Create project
  app.post("/api/admin/projects", requireAuth, async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: error.errors 
        });
      }
      
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  
  // Update project
  app.put("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertProjectSchema.partial().parse(req.body);
      
      const updatedProject = await storage.updateProject(id, validatedData);
      
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid project data", 
          errors: error.errors 
        });
      }
      
      console.error(`Error updating project ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  
  // Delete project
  app.delete("/api/admin/projects/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error(`Error deleting project ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  
  // Get all contact messages (for admin)
  app.get("/api/admin/contact-messages", requireAuth, async (_, res) => {
    try {
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });
  
  // Mark contact message as read
  app.patch("/api/admin/contact-messages/:id/read", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const marked = await storage.markMessageAsRead(id);
      
      if (!marked) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error(`Error marking message ${req.params.id} as read:`, error);
      res.status(500).json({ message: "Failed to mark message as read" });
    }
  });
  
  // Delete contact message
  app.delete("/api/admin/contact-messages/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteContactMessage(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Message not found" });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error(`Error deleting message ${req.params.id}:`, error);
      res.status(500).json({ message: "Failed to delete message" });
    }
  });
  
  // File upload endpoint
  app.post("/api/admin/upload", requireAuth, upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      // Return the URL to the uploaded file
      const filePath = `/uploads/${req.file.filename}`;
      res.json({ filePath });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  return httpServer;
}
