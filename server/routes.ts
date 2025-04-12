import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Octokit } from "octokit";

// GitHub API client setup
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN || "",
});

export async function registerRoutes(app: Express): Promise<Server> {
  const server = createServer(app);

  // API Routes
  // =========================================
  // Get portfolio content sections
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
  app.get("/api/featured-projects", async (_, res) => {
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
      // Tentamos obter dados reais do GitHub se houver token disponível
      if (process.env.GITHUB_TOKEN) {
        try {
          const response = await octokit.request("GET /users/{username}/repos", {
            username: "assisberlanda",
            sort: "updated",
            per_page: 10,
          });
          
          res.json(response.data);
          return;
        } catch (githubError) {
          console.warn("Failed to fetch from GitHub API, fallback to mock data:", githubError);
        }
      }
      
      // Caso não tenha token ou aconteceu erro, usamos dados mockados
      const mockRepos = await storage.getGitHubRepos();
      res.json(mockRepos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ message: "Failed to fetch GitHub repositories" });
    }
  });

  return server;
}