import { 
  users, 
  type User, 
  type InsertUser,
  portfolioContent,
  type PortfolioContent,
  type InsertPortfolioContent,
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

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Portfolio content operations
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  getAllPortfolioContent(): Promise<PortfolioContent[]>;
  updatePortfolioContent(section: string, content: any): Promise<PortfolioContent>;
  
  // Skills operations
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: number): Promise<boolean>;
  
  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined>;
  deleteExperience(id: number): Promise<boolean>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Contact message operations
  getAllContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: number): Promise<boolean>;
  deleteContactMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private portfolioContents: Map<string, PortfolioContent>;
  private skillsList: Map<number, Skill>;
  private experiencesList: Map<number, Experience>;
  private projectsList: Map<number, Project>;
  private contactMessagesList: Map<number, ContactMessage>;
  
  private userId: number;
  private portfolioContentId: number;
  private skillId: number;
  private experienceId: number;
  private projectId: number;
  private contactMessageId: number;
  
  constructor() {
    this.users = new Map();
    this.portfolioContents = new Map();
    this.skillsList = new Map();
    this.experiencesList = new Map();
    this.projectsList = new Map();
    this.contactMessagesList = new Map();
    
    this.userId = 1;
    this.portfolioContentId = 1;
    this.skillId = 1;
    this.experienceId = 1;
    this.projectId = 1;
    this.contactMessageId = 1;
    
    // Initialize with some default portfolio content
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Add default user
    this.createUser({
      username: "admin",
      password: "admin123" // In a real app, this would be hashed
    });
    
    // Add default portfolio content
    this.updatePortfolioContent("hero", {
      title: "Assis Berlanda de Medeiros",
      subtitle: "DevOps Engineer & Software Developer",
      description: "Sou estudante de Engenharia de Software com experiência em DevOps, focado em Docker, Kubernetes, Terraform e outras ferramentas de automação. Possuo inglês avançado e estou sempre aprendendo novas tecnologias.",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a", // Placeholder, would be replaced with actual photo
      cvUrl: "#"
    });
    
    this.updatePortfolioContent("about", {
      title: "Sobre Mim",
      paragraphs: [
        "Sou estudante de Engenharia de Software com nível avançado de inglês. Durante esse tempo na faculdade, tenho me dedicado a diversos cursos na área de tecnologia tais como: Python, Testes de APIs com Postman, SCRUM, Banco de Dados, Cybersegurança, IA Generativa e atualmente estou focado em DevOps e suas principais ferramentas: Docker, Kubernetes, Terraform e etc.",
        "Minha experiência internacional me proporcionou uma visão global do mercado de tecnologia e a capacidade de me adaptar a diferentes ambientes e culturas de trabalho.",
        "Estou em busca de oportunidades que me permitam aplicar meus conhecimentos em DevOps e continuar aprendendo novas tecnologias em um ambiente colaborativo e inovador."
      ],
      education: "Engenharia de Software - Unicesumar",
      language: "Inglês Avançado",
      location: "Brasília, DF",
      relocate: "Disponível para relocação",
      certifications: [
        { name: "Microsoft Azure Essentials", issuer: "Microsoft" },
        { name: "DevOps Fundamentals", issuer: "Digital Innovation One" },
        { name: "Docker", issuer: "Alura" },
        { name: "Kubernetes", issuer: "Alura" },
        { name: "Terraform", issuer: "HashiCorp" }
      ]
    });
    
    this.updatePortfolioContent("contact", {
      title: "Entre em Contato",
      description: "Estou aberto a oportunidades de trabalho em DevOps e desenvolvimento de software. Se você tem um projeto interessante ou uma oportunidade que combina com minhas habilidades, entre em contato comigo usando o formulário abaixo ou diretamente por e-mail.",
      email: "berlanda.medeiros@gmail.com",
      linkedin: "https://www.linkedin.com/in/assismedeiros/",
      github: "https://github.com/assisberlanda",
      location: "Brasília, DF - Brasil",
      relocate: "Disponível para relocação",
      dioProfile: "https://www.dio.me/users/dydhio_34628"
    });
    
    // Add default skills
    this.addDefaultSkills();
    
    // Add default experiences
    this.addDefaultExperiences();
    
    // Add default projects
    this.addDefaultProjects();
  }
  
  private addDefaultSkills() {
    const devopsSkills = [
      { name: "Docker", category: "DevOps & Cloud", proficiency: 85, isVisible: true },
      { name: "Kubernetes", category: "DevOps & Cloud", proficiency: 75, isVisible: true },
      { name: "Terraform", category: "DevOps & Cloud", proficiency: 70, isVisible: true },
      { name: "Azure", category: "DevOps & Cloud", proficiency: 65, isVisible: true },
      { name: "CI/CD", category: "DevOps & Cloud", proficiency: 60, isVisible: true }
    ];
    
    const devSkills = [
      { name: "Python", category: "Desenvolvimento & Ferramentas", proficiency: 80, isVisible: true },
      { name: "SQL", category: "Desenvolvimento & Ferramentas", proficiency: 75, isVisible: true },
      { name: "Git/GitHub", category: "Desenvolvimento & Ferramentas", proficiency: 85, isVisible: true },
      { name: "HTML/CSS", category: "Desenvolvimento & Ferramentas", proficiency: 70, isVisible: true },
      { name: "SCRUM/Agile", category: "Desenvolvimento & Ferramentas", proficiency: 85, isVisible: true }
    ];
    
    const otherSkills = [
      { name: "Postman", category: "Outras Habilidades", proficiency: 80, isVisible: true },
      { name: "IA Generativa", category: "Outras Habilidades", proficiency: 75, isVisible: true },
      { name: "AWS", category: "Outras Habilidades", proficiency: 70, isVisible: true },
      { name: "Azure Copilot", category: "Outras Habilidades", proficiency: 65, isVisible: true },
      { name: "Cybersegurança", category: "Outras Habilidades", proficiency: 60, isVisible: true },
      { name: "Business Agile", category: "Outras Habilidades", proficiency: 75, isVisible: true }
    ];
    
    [...devopsSkills, ...devSkills, ...otherSkills].forEach(skill => {
      this.createSkill(skill);
    });
  }
  
  private addDefaultExperiences() {
    const experiences = [
      {
        position: "Fiscal de Aviação Civil",
        company: "INFRAMERICA – Aeroporto Internacional de Brasília",
        description: "Coordenava e fiscalizava a movimentação de pessoas e equipamentos. Realizava o Marshalling de aeronaves, acoplamento/desacoplamento de Pontes de Embarque e também realizava inspeções em pistas de pouso e decolagens de aeronaves.",
        startDate: "2023",
        endDate: "2024",
        isVisible: true,
        order: 1
      },
      {
        position: "Truck Driver/Delivery",
        company: "FEDEX – Wilmington Unit – Massachussets – EUA",
        description: "Era motorista de caminhão (Step-Van Delivery) e entregador de mercadorias pela FEDEX da Unidade de Wilmington – Massachussets e fazia entrega diariamente nas cidades de Stoneham, Wakefield e Melrose - MA.",
        startDate: "2019",
        endDate: "2020",
        isVisible: true,
        order: 2
      },
      {
        position: "Cabo - Policial Militar",
        company: "POLÍCIA MILITAR – Distrito Federal",
        description: "Era policial militar em Brasília por 12 anos, com excelente ficha, onde os últimos 5 anos no Batalhão Aéreo. Decidi com minha família e saí da polícia militar para estudar e trabalhar nos EUA, fui para Boston onde morei por 7 anos.",
        startDate: "2002",
        endDate: "2014",
        isVisible: true,
        order: 3
      },
      {
        position: "Instalador e Reparador de Linhas e Aparelhos",
        company: "E.T.E. - Engenharia em Telecomunicações e Eletricidade",
        description: "Trabalhava com carro próprio, onde recebia pelo aluguel do carro e gratificação de condutor. Realizava instalação de linhas telefônicas, e manutenção de telefones públicos.",
        startDate: "2001",
        endDate: "2002",
        isVisible: true,
        order: 4
      },
      {
        position: "Operador de Processos de Produção",
        company: "AMBEV - Companhia de Bebidas das Américas",
        description: "Trabalhava no segundo processo de produção de cervejas, no setor de resfriamento de mosto. Trabalhava por escala de 6x1.",
        startDate: "2000",
        endDate: "2000",
        isVisible: true,
        order: 5
      }
    ];
    
    experiences.forEach(exp => {
      this.createExperience(exp);
    });
  }
  
  private addDefaultProjects() {
    const projects = [
      {
        title: "Docker Compose Collection",
        description: "Uma coleção de arquivos Docker Compose para configurar rapidamente ambientes de desenvolvimento e aplicações comuns.",
        tags: ["Docker", "Docker Compose", "DevOps"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Kubernetes Deployment Templates",
        description: "Templates para implantação de aplicações em clusters Kubernetes, incluindo serviços, deployments e configurações de rede.",
        tags: ["Kubernetes", "YAML", "DevOps"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Terraform Azure Modules",
        description: "Coleção de módulos Terraform para provisionamento de infraestrutura na Azure, incluindo VMs, redes e serviços gerenciados.",
        tags: ["Terraform", "Azure", "IaC"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Python API Testing Framework",
        description: "Framework para automação de testes de APIs RESTful usando Python, com geração de relatórios e integração com CI/CD.",
        tags: ["Python", "API Testing", "Automation"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        title: "CI/CD Pipeline Templates",
        description: "Templates para pipelines de CI/CD usando GitHub Actions, com foco em aplicações containerizadas e infraestrutura como código.",
        tags: ["GitHub Actions", "CI/CD", "YAML"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Portfolio Pessoal",
        description: "Site de portfólio pessoal desenvolvido com React, Tailwind CSS e API do GitHub, com design responsivo e integração com APIs de terceiros.",
        tags: ["React", "Tailwind CSS", "GitHub API"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      }
    ];
    
    projects.forEach(project => {
      this.createProject(project);
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Portfolio content operations
  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    return Array.from(this.portfolioContents.values()).find(
      (content) => content.section === section,
    );
  }
  
  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    return Array.from(this.portfolioContents.values());
  }
  
  async updatePortfolioContent(section: string, content: any): Promise<PortfolioContent> {
    const existingContent = await this.getPortfolioContent(section);
    
    if (existingContent) {
      const updatedContent: PortfolioContent = {
        ...existingContent,
        content,
        lastUpdated: new Date()
      };
      
      this.portfolioContents.set(existingContent.id, updatedContent);
      return updatedContent;
    } else {
      const id = this.portfolioContentId++;
      const newContent: PortfolioContent = {
        id,
        section,
        content,
        lastUpdated: new Date()
      };
      
      this.portfolioContents.set(id, newContent);
      return newContent;
    }
  }
  
  // Skills operations
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skillsList.values());
  }
  
  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skillsList.values()).filter(
      (skill) => skill.category === category,
    );
  }
  
  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = this.skillId++;
    const newSkill: Skill = { ...skill, id };
    this.skillsList.set(id, newSkill);
    return newSkill;
  }
  
  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill | undefined> {
    const existingSkill = this.skillsList.get(id);
    
    if (!existingSkill) {
      return undefined;
    }
    
    const updatedSkill: Skill = { ...existingSkill, ...skill };
    this.skillsList.set(id, updatedSkill);
    return updatedSkill;
  }
  
  async deleteSkill(id: number): Promise<boolean> {
    return this.skillsList.delete(id);
  }
  
  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return Array.from(this.experiencesList.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async createExperience(experience: InsertExperience): Promise<Experience> {
    const id = this.experienceId++;
    const newExperience: Experience = { ...experience, id };
    this.experiencesList.set(id, newExperience);
    return newExperience;
  }
  
  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience | undefined> {
    const existingExperience = this.experiencesList.get(id);
    
    if (!existingExperience) {
      return undefined;
    }
    
    const updatedExperience: Experience = { ...existingExperience, ...experience };
    this.experiencesList.set(id, updatedExperience);
    return updatedExperience;
  }
  
  async deleteExperience(id: number): Promise<boolean> {
    return this.experiencesList.delete(id);
  }
  
  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projectsList.values());
  }
  
  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projectsList.values()).filter(
      (project) => project.isFeatured && project.isVisible,
    );
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.projectId++;
    const newProject: Project = { ...project, id };
    this.projectsList.set(id, newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projectsList.get(id);
    
    if (!existingProject) {
      return undefined;
    }
    
    const updatedProject: Project = { ...existingProject, ...project };
    this.projectsList.set(id, updatedProject);
    return updatedProject;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    return this.projectsList.delete(id);
  }
  
  // Contact message operations
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessagesList.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt: new Date(),
      isRead: false
    };
    this.contactMessagesList.set(id, newMessage);
    return newMessage;
  }
  
  async markMessageAsRead(id: number): Promise<boolean> {
    const message = this.contactMessagesList.get(id);
    
    if (!message) {
      return false;
    }
    
    message.isRead = true;
    this.contactMessagesList.set(id, message);
    return true;
  }
  
  async deleteContactMessage(id: number): Promise<boolean> {
    return this.contactMessagesList.delete(id);
  }
}

export const storage = new MemStorage();
