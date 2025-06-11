import { 
  type PortfolioContent,
  type Experience,
  type Project
} from "@shared/schema";

export interface IStorage {
  // Portfolio content operations
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  getAllPortfolioContent(): Promise<PortfolioContent[]>;
  
  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  
  // Project operations
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  
  // GitHub repos operations
  getGitHubRepos(): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private portfolioContents: Map<string, PortfolioContent> = new Map();
  private experiencesList: Experience[] = [];
  private projectsList: Project[] = [];
  private cachedGitHubRepos: any[] | null = null;
  
  constructor() {
    // Inicializa dados estáticos para a landing page
    this.initializeStaticData();
  }
  
  private initializeStaticData() {
    // Hero section
    this.portfolioContents.set("hero", {
      id: 1,
      section: "hero",
      content: {
        title: "Assis Berlanda de Medeiros",
        subtitle: "DevOps Engineer & Software Developer",
        description: "Sou estudante de Engenharia de Software com experiência em DevOps, focado em Docker, Kubernetes, Terraform e outras ferramentas de automação. Possuo inglês avançado e estou sempre aprendendo novas tecnologias.",
        photoUrl: "/Assis.jpeg",
        cvUrl: "/CV- DevOps.pdf"
      },
      lastUpdated: new Date().toISOString()
    });
    
    // About section
    this.portfolioContents.set("about", {
      id: 2,
      section: "about",
      content: {
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
      },
      lastUpdated: new Date().toISOString()
    });
    
    // Contact section
    this.portfolioContents.set("contact", {
      id: 3,
      section: "contact",
      content: {
        title: "Entre em Contato",
        description: "Estou aberto a oportunidades de trabalho em DevOps e desenvolvimento de software. Se você tem um projeto interessante ou uma oportunidade que combina com minhas habilidades, entre em contato comigo usando o formulário abaixo ou diretamente por e-mail.",
        email: "berlanda.medeiros@gmail.com",
        linkedin: "https://www.linkedin.com/in/assismedeiros/",
        github: "https://github.com/assisberlanda",
        location: "Brasília, DF - Brasil",
        relocate: "Disponível para relocação",
        dioProfile: "https://www.dio.me/users/dydhio_34628"
      },
      lastUpdated: new Date().toISOString()
    });
    
    // Experiências
    this.experiencesList = [
      {
        id: 1,
        position: "Fiscal de Aviação Civil",
        company: "INFRAMERICA – Aeroporto Internacional de Brasília",
        description: "Coordenava e fiscalizava a movimentação de pessoas e equipamentos. Realizava o Marshalling de aeronaves, acoplamento/desacoplamento de Pontes de Embarque e também realizava inspeções em pistas de pouso e decolagens de aeronaves.",
        startDate: "2023",
        endDate: "2024",
        isVisible: true,
        order: 1
      },
      {
        id: 2,
        position: "Truck Driver/Delivery",
        company: "FEDEX – Wilmington Unit – Massachussets – EUA",
        description: "Era motorista de caminhão (Step-Van Delivery) e entregador de mercadorias pela FEDEX da Unidade de Wilmington – Massachussets e fazia entrega diariamente nas cidades de Stoneham, Wakefield e Melrose - MA.",
        startDate: "2019",
        endDate: "2020",
        isVisible: true,
        order: 2
      },
      {
        id: 3,
        position: "Cabo - Policial Militar",
        company: "POLÍCIA MILITAR – Distrito Federal",
        description: "Era policial militar em Brasília por 12 anos, com excelente ficha, onde os últimos 5 anos no Batalhão Aéreo. Decidi com minha família e saí da polícia militar para estudar e trabalhar nos EUA, fui para Boston onde morei por 7 anos.",
        startDate: "2002",
        endDate: "2014",
        isVisible: true,
        order: 3
      },
      {
        id: 4,
        position: "Instalador e Reparador de Linhas e Aparelhos",
        company: "E.T.E. - Engenharia em Telecomunicações e Eletricidade",
        description: "Trabalhava com carro próprio, onde recebia pelo aluguel do carro e gratificação de condutor. Realizava instalação de linhas telefônicas, e manutenção de telefones públicos.",
        startDate: "2001",
        endDate: "2002",
        isVisible: true,
        order: 4
      },
      {
        id: 5,
        position: "Operador de Processos de Produção",
        company: "AMBEV - Companhia de Bebidas das Américas",
        description: "Trabalhava no segundo processo de produção de cervejas, no setor de resfriamento de mosto. Trabalhava por escala de 6x1.",
        startDate: "2000",
        endDate: "2000",
        isVisible: true,
        order: 5
      }
    ];
    
    // Projetos
    this.projectsList = [
      {
        id: 1,
        title: "Sou-Solidario",
        description: "O Sou Solidário não é apenas um projeto de hackathon; é uma solução escalável, com um propósito social forte e a tecnologia para fazer a diferença. Convidamos você a se juntar a nós nesta jornada para construir um futuro mais justo, conectado e solidário.",
        tags: ["TypeScript", "Hackathon", "WebApp"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 1,
        title: "intuitiveCare - Teste de Nivelamento",
        description: "Esse foi um projeto para um Teste de Nivelamento da empresa IntuitiveCare, onde desenvolvi uma aplicação web simples para consultas.",
        tags: ["Python", "JavaScript", "Vue"],
        repoUrl: "https://github.com/assisberlanda/intuitiveCare",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 1,
        title: "Docker Compose e Microservicos",
        description: "Uma cole\xE7\xE3o de arquivos Docker Compose para configurar rapidamente ambientes de desenvolvimento e utilização prática no cenário de Microsserviços..",
        tags: ["Docker", "Docker Compose", "DevOps"],
        repoUrl: "https://github.com/assisberlanda/Docker-Microservicos",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 2,
        title: "Kubernetes Deployment",
        description: "Implanta\xE7\xE3o de aplica\xE7\xF5es em clusters Kubernetes, incluindo servi\xE7os, deployments de aplicação com Docker e Kubernetes - GCP.",
        tags: ["Kubernetes", "Dockerfile", "DevOps"],
        repoUrl: "https://github.com/assisberlanda/gitlhub-cicd-app-base",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 3,
        title: "Terraform Azure Modules",
        description: "Cole\xE7\xE3o de m\xF3dulos Terraform para provisionamento de infraestrutura na Azure, incluindo VMs, redes e servi\xE7os gerenciados.",
        tags: ["Terraform", "Azure", "IaC"],
        repoUrl: "https://github.com/assisberlanda/pipeline-github-actions-v1",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 4,
        title: "CI/CD com Postman e Newman - serverRestAPI",
        description: "Criação de testes de API utilizando postman, newman e newman-htmlextra",
        tags: ["Python", "API Testing", "Automation"],
        repoUrl: "https://github.com/assisberlanda/serverRestAPI",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 5,
        title: "Dashboard Estimador Codex",
        description: "Calculadora que estima o custo de uso da API da OpenAI com base nos tokens",
        tags: ["GitHub Actions", "CI/CD", "YAML"],
        repoUrl: "https://github.com/assisberlanda/codex_estimator_dashboard",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      },
      {
        id: 6,
        title: "Portfolio Pessoal",
        description: "Site de portf\xF3lio pessoal desenvolvido com React, Tailwind CSS e API do GitHub, com design responsivo e integra\xE7\xE3o com APIs de terceiros.",
        tags: ["React", "Tailwind CSS", "GitHub API"],
        repoUrl: "https://github.com/assisberlanda",
        demoUrl: "",
        isVisible: true,
        isFeatured: true
      }
    ];
  }
  
  // Portfolio content operations
  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    return this.portfolioContents.get(section);
  }
  
  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    return Array.from(this.portfolioContents.values());
  }
  
  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return [...this.experiencesList].sort((a, b) => a.order - b.order);
  }
  
  // Project operations
  async getAllProjects(): Promise<Project[]> {
    return this.projectsList;
  }
  
  async getFeaturedProjects(): Promise<Project[]> {
    return this.projectsList.filter(project => project.isFeatured && project.isVisible);
  }
  
  // GitHub repos operations
  async getGitHubRepos(): Promise<any[]> {
    // Retornar dados pré-carregados ou dados do cache para simular repos do GitHub
    if (this.cachedGitHubRepos) {
      return this.cachedGitHubRepos;
    }
    
    // Define dados simulados para repositórios GitHub
    this.cachedGitHubRepos = [
      {
        id: 956542314,
        name: "docker-compose-collection",
        html_url: "https://github.com/assisberlanda/docker-compose-collection",
        description: "Uma coleção de arquivos Docker Compose para configurar rapidamente ambientes de desenvolvimento e aplicações comuns.",
        language: "YAML",
        stargazers_count: 12,
        forks_count: 5,
        topics: ["docker", "devops", "containers"]
      },
      {
        id: 956542315,
        name: "kubernetes-templates",
        html_url: "https://github.com/assisberlanda/kubernetes-templates",
        description: "Templates para implantação de aplicações em clusters Kubernetes.",
        language: "YAML",
        stargazers_count: 8,
        forks_count: 3,
        topics: ["kubernetes", "devops", "containers"]
      },
      {
        id: 956542316,
        name: "terraform-azure-modules",
        html_url: "https://github.com/assisberlanda/terraform-azure-modules",
        description: "Módulos Terraform para provisionamento de infraestrutura na Azure.",
        language: "HCL",
        stargazers_count: 15,
        forks_count: 7,
        topics: ["terraform", "azure", "iac", "devops"]
      }
    ];
    
    return this.cachedGitHubRepos;
  }
}

export const storage = new MemStorage();