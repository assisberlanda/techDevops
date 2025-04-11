import { useProjects } from "@/hooks/usePortfolioContent";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function Projects() {
  const { data: projects, isLoading: isLoadingProjects } = useProjects();
  const { data: githubRepos } = useGithubRepos();
  
  if (isLoadingProjects) {
    return (
      <section id="projects" className="py-20 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-20 flex justify-center items-center min-h-[400px]">
        <p>No projects found</p>
      </section>
    );
  }
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <SectionHeading number="3" title="Projetos" />
        
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg max-w-3xl mx-auto">
            Aqui estão alguns dos meus projetos recentes. Esses projetos demonstram minhas habilidades
            em DevOps, automação e desenvolvimento de software.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              tags={project.tags}
              repoUrl={project.repoUrl || undefined}
              demoUrl={project.demoUrl || undefined}
            />
          ))}
        </div>
        
        {githubRepos && githubRepos.length > 0 && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-8 text-center">Projetos do GitHub</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {githubRepos.slice(0, 3).map((repo) => (
                <ProjectCard
                  key={repo.id}
                  title={repo.name}
                  description={repo.description || "No description available"}
                  tags={[repo.language || "Code", "GitHub"]}
                  repoUrl={repo.html_url}
                />
              ))}
            </div>
          </motion.div>
        )}
        
        <div className="text-center mt-12">
          <a 
            href="https://github.com/assisberlanda" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="ghost" className="text-primary">
              Ver mais projetos no GitHub <span className="ml-2">→</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
