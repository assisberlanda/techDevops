import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { ContactMessage, Experience, Project, Skill } from "@shared/schema";

// Types for the portfolio content
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  photoUrl: string;
  cvUrl: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  education: string;
  language: string;
  location: string;
  relocate: string;
  certifications: Array<{ name: string; issuer: string }>;
}

export interface ContactContent {
  title: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  relocate: string;
  dioProfile: string;
}

interface PortfolioContent<T> {
  id: number;
  section: string;
  content: T;
  lastUpdated: string;
}

// Hooks for fetching content
export function useHeroContent() {
  return useQuery<PortfolioContent<HeroContent>>({
    queryKey: ["/api/content/hero"],
  });
}

export function useAboutContent() {
  return useQuery<PortfolioContent<AboutContent>>({
    queryKey: ["/api/content/about"],
  });
}

export function useContactContent() {
  return useQuery<PortfolioContent<ContactContent>>({
    queryKey: ["/api/content/contact"],
  });
}

export function useSkills() {
  return useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });
}

export function useSkillsByCategory(category: string) {
  return useQuery<Skill[]>({
    queryKey: ["/api/skills", category],
    enabled: !!category,
  });
}

export function useExperiences() {
  return useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
  });
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });
}

export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ["/api/projects/featured"],
  });
}

// Admin hooks for updating content
export function useUpdatePortfolioContent<T>(section: string) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (content: T) => {
      const res = await apiRequest("PUT", `/api/admin/content/${section}`, content);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/content/${section}`] });
    },
  });
}

export function useSubmitContactForm() {
  return useMutation({
    mutationFn: async (data: Omit<ContactMessage, "id" | "createdAt" | "isRead">) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
  });
}

// Admin hooks
export function useAdminContactMessages() {
  return useQuery<ContactMessage[]>({
    queryKey: ["/api/admin/contact-messages"],
  });
}

export function useMarkMessageAsRead() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("PATCH", `/api/admin/contact-messages/${id}/read`, {});
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
    },
  });
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/contact-messages/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-messages"] });
    },
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (skill: Omit<Skill, "id">) => {
      const res = await apiRequest("POST", "/api/admin/skills", skill);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
    },
  });
}

export function useUpdateSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Omit<Skill, "id">> }) => {
      const res = await apiRequest("PUT", `/api/admin/skills/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
    },
  });
}

export function useDeleteSkill() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/skills/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
    },
  });
}

export function useCreateExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (experience: Omit<Experience, "id">) => {
      const res = await apiRequest("POST", "/api/admin/experiences", experience);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
    },
  });
}

export function useUpdateExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Omit<Experience, "id">> }) => {
      const res = await apiRequest("PUT", `/api/admin/experiences/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
    },
  });
}

export function useDeleteExperience() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/experiences/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experiences"] });
    },
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (project: Omit<Project, "id">) => {
      const res = await apiRequest("POST", "/api/admin/projects", project);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Omit<Project, "id">> }) => {
      const res = await apiRequest("PUT", `/api/admin/projects/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/admin/projects/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/projects/featured"] });
    },
  });
}

export function useUploadFile() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer admin123`, // In a real app, this would be a proper token
        },
        body: formData,
      });
      
      if (!res.ok) {
        throw new Error("Failed to upload file");
      }
      
      return res.json();
    },
  });
}
