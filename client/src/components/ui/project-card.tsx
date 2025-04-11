import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  className?: string;
}

export function ProjectCard({ 
  title, 
  description, 
  tags, 
  repoUrl, 
  demoUrl, 
  className 
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="text-primary text-3xl">
              <FolderOpen />
            </div>
            <div className="flex space-x-3">
              {repoUrl && (
                <a 
                  href={repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={20} />
                </a>
              )}
              {demoUrl && (
                <a 
                  href={demoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
          
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
            {tags.map((tag, index) => (
              <span key={index}>{tag}</span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
