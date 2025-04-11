import { db } from "../server/db";
import { 
  portfolioContent, 
  users, 
  skills,
  experiences,
  projects
} from "../shared/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding database with initial content...");

  // Create admin user if it doesn't exist
  const existingUser = await db.select().from(users).where(eq(users.username, "admin"));
  
  if (existingUser.length === 0) {
    console.log("Creating admin user");
    await db.insert(users).values({
      username: "admin",
      password: "admin123", // This would be hashed in a real app
      isAdmin: true
    });
  }

  // Seed portfolio content
  const sections = ["hero", "about", "contact"];
  
  for (const section of sections) {
    const existingContent = await db.select().from(portfolioContent).where(eq(portfolioContent.section, section));
    
    if (existingContent.length === 0) {
      console.log(`Creating ${section} section content`);
      
      let content = {};
      
      if (section === "hero") {
        content = {
          title: "Assis Medeiros",
          subtitle: "DevOps Engineer & Cloud Specialist",
          description: "Automating deployment processes and optimizing cloud infrastructure for scalable applications.",
          photoUrl: "/uploads/Assis-800.jpg",
          cvUrl: "/uploads/CV- DevOps.pdf"
        };
      } else if (section === "about") {
        content = {
          title: "About Me",
          paragraphs: [
            "I'm a DevOps Engineer with over 10 years of experience in IT focusing on cloud infrastructure and automation. I specialize in building robust CI/CD pipelines and implementing infrastructure as code solutions.",
            "My expertise covers a wide range of technologies including Kubernetes, Docker, Terraform, AWS, Azure, and GCP. I'm passionate about automating processes and improving development workflows."
          ],
          education: "Bachelor's Degree in Systems Analysis",
          language: "English (Fluent), Portuguese (Native)",
          location: "São Paulo, Brazil",
          relocate: "Open to relocation",
          certifications: [
            { name: "AWS Certified DevOps Engineer", issuer: "Amazon Web Services" },
            { name: "Certified Kubernetes Administrator", issuer: "Cloud Native Computing Foundation" },
            { name: "Microsoft Certified: Azure DevOps Engineer", issuer: "Microsoft" }
          ]
        };
      } else if (section === "contact") {
        content = {
          title: "Get In Touch",
          description: "Feel free to reach out if you're interested in working together or have any questions.",
          email: "assisberlanda@gmail.com",
          linkedin: "https://www.linkedin.com/in/assismedeiros/",
          github: "https://github.com/assisberlanda",
          location: "São Paulo, Brazil",
          relocate: "Open to relocation",
          dioProfile: "https://www.dio.me/users/assisberlanda"
        };
      }
      
      await db.insert(portfolioContent).values({
        section,
        content,
        lastUpdated: new Date()
      });
    }
  }

  // Add skills
  const existingSkills = await db.select().from(skills);
  
  if (existingSkills.length === 0) {
    console.log("Adding default skills");
    
    const defaultSkills = [
      // DevOps
      { name: "Kubernetes", category: "DevOps", proficiency: 90, isVisible: true },
      { name: "Docker", category: "DevOps", proficiency: 95, isVisible: true },
      { name: "Terraform", category: "DevOps", proficiency: 85, isVisible: true },
      { name: "Jenkins", category: "DevOps", proficiency: 80, isVisible: true },
      { name: "GitLab CI", category: "DevOps", proficiency: 85, isVisible: true },
      { name: "GitHub Actions", category: "DevOps", proficiency: 80, isVisible: true },
      
      // Cloud
      { name: "AWS", category: "Cloud", proficiency: 90, isVisible: true },
      { name: "Azure", category: "Cloud", proficiency: 85, isVisible: true },
      { name: "Google Cloud", category: "Cloud", proficiency: 75, isVisible: true },
      
      // Programming
      { name: "Python", category: "Programming", proficiency: 75, isVisible: true },
      { name: "Go", category: "Programming", proficiency: 70, isVisible: true },
      { name: "Bash", category: "Programming", proficiency: 85, isVisible: true },
      { name: "JavaScript", category: "Programming", proficiency: 65, isVisible: true },
      
      // Database
      { name: "PostgreSQL", category: "Database", proficiency: 70, isVisible: true },
      { name: "MongoDB", category: "Database", proficiency: 75, isVisible: true },
      
      // Monitoring
      { name: "Prometheus", category: "Monitoring", proficiency: 80, isVisible: true },
      { name: "Grafana", category: "Monitoring", proficiency: 85, isVisible: true },
      { name: "ELK Stack", category: "Monitoring", proficiency: 75, isVisible: true }
    ];
    
    for (const skill of defaultSkills) {
      await db.insert(skills).values(skill);
    }
  }

  // Add experiences
  const existingExperiences = await db.select().from(experiences);
  
  if (existingExperiences.length === 0) {
    console.log("Adding default experiences");
    
    const defaultExperiences = [
      {
        position: "Senior DevOps Engineer",
        company: "Cloud Solutions Inc.",
        description: "Led DevOps practices across multiple teams, implementing CI/CD pipelines that reduced deployment time by 70%. Migrated legacy infrastructure to Kubernetes, improving scalability and reducing operational costs by 30%.",
        startDate: "2020-01",
        endDate: null,
        order: 1,
        isVisible: true
      },
      {
        position: "DevOps Engineer",
        company: "Tech Innovations Ltd.",
        description: "Implemented infrastructure as code using Terraform and Ansible. Designed and maintained a microservices architecture using Docker and Kubernetes. Automated deployment processes that increased release frequency from monthly to weekly.",
        startDate: "2017-03",
        endDate: "2019-12",
        order: 2,
        isVisible: true
      },
      {
        position: "Systems Administrator",
        company: "Digital Solutions Group",
        description: "Managed on-premises and cloud infrastructure. Initiated the company's transition to DevOps methodologies by introducing configuration management and automated deployments.",
        startDate: "2014-05",
        endDate: "2017-02",
        order: 3,
        isVisible: true
      }
    ];
    
    for (const experience of defaultExperiences) {
      await db.insert(experiences).values(experience);
    }
  }

  // Add projects
  const existingProjects = await db.select().from(projects);
  
  if (existingProjects.length === 0) {
    console.log("Adding default projects");
    
    const defaultProjects = [
      {
        title: "Cloud Migration Framework",
        description: "Developed a framework for seamlessly migrating legacy applications to cloud environments with minimal downtime. Includes assessment tools, migration patterns, and automated verification.",
        repoUrl: null,
        demoUrl: null,
        tags: ["Terraform", "AWS", "Python", "CI/CD"],
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Kubernetes Operator for Database Management",
        description: "Created a custom Kubernetes operator for automating database provisioning, backup, and scaling operations. Supports PostgreSQL and MySQL with automated failover capabilities.",
        repoUrl: "https://github.com/assisberlanda/k8s-db-operator",
        demoUrl: null,
        tags: ["Kubernetes", "Go", "Databases", "Operator SDK"],
        isVisible: true,
        isFeatured: true
      },
      {
        title: "Monitoring Dashboard",
        description: "Built a comprehensive monitoring solution using Prometheus and Grafana to provide real-time visibility into application and infrastructure performance.",
        repoUrl: "https://github.com/assisberlanda/monitoring-dashboard",
        demoUrl: null,
        tags: ["Prometheus", "Grafana", "Monitoring", "Dashboards"],
        isVisible: true,
        isFeatured: true
      }
    ];
    
    for (const project of defaultProjects) {
      await db.insert(projects).values(project);
    }
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });