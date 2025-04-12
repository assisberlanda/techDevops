import { createContext, useContext, useEffect, useState } from "react";

// Tipos de idiomas suportados
type Language = "pt-BR" | "en-US";

// Interface do contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  t: (key: string) => string;
}

// Interface do provider
interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLanguage?: Language;
}

// Contexto de idioma
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções
const translationMap: Record<Language, Record<string, string>> = {
  "pt-BR": {
    // Hero
    "hero.subtitle": "DevOps Engineer & Software Developer",
    "hero.description": "Sou estudante de Engenharia de Software com experiência em DevOps, focado em Docker, Kubernetes, Terraform e outras ferramentas de automação. Possuo inglês avançado e estou sempre aprendendo novas tecnologias.",
    
    // Navbar
    "nav.about": "1. Sobre Mim",
    "nav.experience": "2. Experiências Profissionais",
    "nav.projects": "3. Projetos",
    "nav.contact": "4. Contato",
    
    // About
    "about.title": "Sobre Mim",
    "about.paragraph1": "Sou estudante de Engenharia de Software com nível avançado de inglês. Durante esse tempo na faculdade, tenho me dedicado a diversos cursos na área de tecnologia tais como: Python, Testes de APIs com Postman, SCRUM, Banco de Dados, Cybersegurança, IA Generativa e atualmente estou focado em DevOps e suas principais ferramentas: Docker, Kubernetes, Terraform e etc.",
    "about.paragraph2": "Minha experiência internacional me proporcionou uma visão global do mercado de tecnologia e a capacidade de me adaptar a diferentes ambientes e culturas de trabalho.",
    "about.paragraph3": "Estou em busca de oportunidades que me permitam aplicar meus conhecimentos em DevOps e continuar aprendendo novas tecnologias em um ambiente colaborativo e inovador.",
    "about.education": "Engenharia de Software - Unicesumar",
    "about.language": "Inglês Avançado",
    "about.location": "Brasília, DF",
    "about.relocate": "Disponível para relocação",
    "about.profile.title": "Perfil Comportamental",
    "about.profile.mindsight": "Análise Mindsight",
    "about.profile.mindsight.desc": "Avaliação de competências e perfil de gestão",
    "about.profile.mindsight.btn": "Ver resultados completos",
    "about.profile.gupy": "Mapeamento Gupy",
    "about.profile.gupy.desc": "Análise de perfil comportamental e competências",
    "about.profile.gupy.btn": "Ver resultados completos",
    "about.interests.title": "Áreas de Interesse",
    "about.interests.iac": "Infraestrutura como Código",
    "about.interests.iac.desc": "Terraform, Ansible, CloudFormation",
    "about.interests.containers": "Orquestração de Contêineres",
    "about.interests.containers.desc": "Kubernetes, Docker Swarm",
    "about.interests.cicd": "CI/CD Pipelines",
    "about.interests.cicd.desc": "GitHub Actions, Jenkins, GitLab CI",
    
    // Experience
    "experience.title": "Experiências Profissionais",
    "experience.civilAviation": "Fiscal de Aviação Civil",
    "experience.civilAviation.company": "Aeroporto Internacional de Brasília",
    "experience.civilAviation.description": "Fiscalização de procedimentos operacionais, garantindo o cumprimento das normas de segurança da aviação civil. Realização de inspeções de segurança e coordenação de equipes em ambiente aeroportuário.",
    "experience.programmer": "Programador",
    "experience.programmer.company": "MDIC - Ministério do Desenvolvimento, Indústria e Comércio",
    "experience.programmer.description": "Desenvolvimento e manutenção de sistemas internos utilizando Java e Oracle. Participação em projetos de modernização tecnológica e integração de sistemas legados.",
    "experience.english": "Professor de Inglês",
    "experience.english.company": "Curso de Inglês KNN",
    "experience.english.description": "Ministração de aulas de inglês para turmas de diferentes níveis. Desenvolvimento de material didático e avaliação de progresso dos alunos.",
    
    // Projects
    "projects.title": "Projetos",
    "projects.description": "Aqui estão alguns dos meus projetos recentes. Esses projetos demonstram minhas habilidades em DevOps, automação e desenvolvimento de software.",
    "projects.github.title": "Projetos do GitHub",
    "projects.more": "Ver mais projetos no GitHub",
    "projects.dockerCompose": "Docker Compose Collection",
    "projects.dockerCompose.description": "Coleção de arquivos Docker Compose para diferentes pilhas de aplicações, com configurações otimizadas para desenvolvimento e produção.",
    "projects.terraform": "Terraform Azure Modules",
    "projects.terraform.description": "Coleção de módulos Terraform para provisionamento de infraestrutura na Azure, incluindo VMs, redes e serviços gerenciados.",
    "projects.python": "Python API Testing Framework",
    "projects.python.description": "Framework para automação de testes de APIs RESTful usando Python, com geração de relatórios e integração com CI/CD.",
    "projects.cicd": "CI/CD Pipeline Templates",
    "projects.cicd.description": "Templates para pipelines de CI/CD usando GitHub Actions, com foco em aplicações containerizadas e infraestrutura como código.",
    "projects.portfolio": "Portfolio Pessoal",
    "projects.portfolio.description": "Site de portfólio pessoal desenvolvido com React, Tailwind CSS e API do GitHub, com design responsivo e integração com APIs de terceiros.",
    
    // Contact
    "contact.title": "Contato",
    "contact.description": "Estou aberto a oportunidades de trabalho em DevOps e desenvolvimento de software. Se você tem um projeto interessante ou uma oportunidade que combina com minhas habilidades, entre em contato comigo diretamente por e-mail.",
    "contact.info": "Informações de Contato",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub", 
    "contact.location": "Localização",
    "contact.downloadCV": "Download CV",
    "contact.dioProfile": "Perfil DIO",
    
    // Footer
    "footer.rights": "Todos os direitos reservados.",
    "footer.builtWith": "Feito com",
    "footer.stack": "usando React, Tailwind CSS e API do GitHub",
    "footer.terms": "Termos de Uso",
    "footer.privacy": "Política de Privacidade"
  },
  "en-US": {
    // Hero
    "hero.subtitle": "DevOps Engineer & Software Developer",
    "hero.description": "I'm a Software Engineering student with experience in DevOps, focused on Docker, Kubernetes, Terraform, and other automation tools. I have advanced English skills and I'm constantly learning new technologies.",
    
    // Navbar
    "nav.about": "1. About Me",
    "nav.experience": "2. Professional Experience",
    "nav.projects": "3. Projects",
    "nav.contact": "4. Contact",
    
    // About
    "about.title": "About Me",
    "about.paragraph1": "I'm a Software Engineering student with advanced English proficiency. During my time in college, I've dedicated myself to various technology courses such as Python, API Testing with Postman, SCRUM, Databases, Cybersecurity, Generative AI, and I'm currently focused on DevOps and its main tools: Docker, Kubernetes, Terraform, etc.",
    "about.paragraph2": "My international experience has given me a global view of the technology market and the ability to adapt to different environments and work cultures.",
    "about.paragraph3": "I'm looking for opportunities that allow me to apply my knowledge in DevOps and continue learning new technologies in a collaborative and innovative environment.",
    "about.education": "Software Engineering - Unicesumar",
    "about.language": "Advanced English",
    "about.location": "Brasília, DF - Brazil",
    "about.relocate": "Open to relocation",
    "about.profile.title": "Behavioral Profile",
    "about.profile.mindsight": "Mindsight Analysis",
    "about.profile.mindsight.desc": "Skills assessment and management profile",
    "about.profile.mindsight.btn": "View complete results",
    "about.profile.gupy": "Gupy Mapping",
    "about.profile.gupy.desc": "Behavioral profile and skills analysis",
    "about.profile.gupy.btn": "View complete results",
    "about.interests.title": "Areas of Interest",
    "about.interests.iac": "Infrastructure as Code",
    "about.interests.iac.desc": "Terraform, Ansible, CloudFormation",
    "about.interests.containers": "Container Orchestration",
    "about.interests.containers.desc": "Kubernetes, Docker Swarm",
    "about.interests.cicd": "CI/CD Pipelines",
    "about.interests.cicd.desc": "GitHub Actions, Jenkins, GitLab CI",
    
    // Experience
    "experience.title": "Professional Experience",
    "experience.civilAviation": "Civil Aviation Inspector",
    "experience.civilAviation.company": "Brasília International Airport",
    "experience.civilAviation.description": "Inspection of operational procedures, ensuring compliance with civil aviation safety regulations. Conducting security inspections and coordinating teams in the airport environment.",
    "experience.programmer": "Programmer",
    "experience.programmer.company": "MDIC - Ministry of Development, Industry and Commerce",
    "experience.programmer.description": "Development and maintenance of internal systems using Java and Oracle. Participation in technological modernization projects and integration of legacy systems.",
    "experience.english": "English Teacher",
    "experience.english.company": "KNN English Course",
    "experience.english.description": "Teaching English classes to groups of different levels. Development of teaching materials and assessment of student progress.",
    
    // Projects
    "projects.title": "Projects",
    "projects.description": "Here are some of my recent projects. These projects demonstrate my skills in DevOps, automation, and software development.",
    "projects.github.title": "GitHub Projects",
    "projects.more": "See more projects on GitHub",
    "projects.dockerCompose": "Docker Compose Collection",
    "projects.dockerCompose.description": "Collection of Docker Compose files for different application stacks, with optimized configurations for development and production.",
    "projects.terraform": "Terraform Azure Modules",
    "projects.terraform.description": "Collection of Terraform modules for provisioning infrastructure on Azure, including VMs, networks, and managed services.",
    "projects.python": "Python API Testing Framework",
    "projects.python.description": "Framework for automating RESTful API tests using Python, with report generation and CI/CD integration.",
    "projects.cicd": "CI/CD Pipeline Templates",
    "projects.cicd.description": "Templates for CI/CD pipelines using GitHub Actions, focusing on containerized applications and infrastructure as code.",
    "projects.portfolio": "Personal Portfolio",
    "projects.portfolio.description": "Personal portfolio website developed with React, Tailwind CSS and GitHub API, with responsive design and integration with third-party APIs.",
    
    // Contact
    "contact.title": "Contact",
    "contact.description": "I'm open to DevOps and software development job opportunities. If you have an interesting project or an opportunity that matches my skills, please contact me directly via email.",
    "contact.info": "Contact Information",
    "contact.email": "Email",
    "contact.linkedin": "LinkedIn",
    "contact.github": "GitHub", 
    "contact.location": "Location",
    "contact.downloadCV": "Download CV",
    "contact.dioProfile": "DIO Profile",
    
    // Footer
    "footer.rights": "All rights reserved.",
    "footer.builtWith": "Built with",
    "footer.stack": "using React, Tailwind CSS, and GitHub API",
    "footer.terms": "Terms of Use",
    "footer.privacy": "Privacy Policy"
  }
};

export function LanguageProvider({
  children,
  defaultLanguage = "pt-BR",
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);
  const [translations, setTranslations] = useState(translationMap[defaultLanguage]);
  
  useEffect(() => {
    setTranslations(translationMap[language]);
  }, [language]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};