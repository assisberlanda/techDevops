import { motion } from "framer-motion";
import { GraduationCap, Languages, MapPin, Plane, Loader2 } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { useAboutContent } from "@/hooks/usePortfolioContent";

export function About() {
  const { data: aboutContent, isLoading } = useAboutContent();
  
  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!aboutContent) {
    return (
      <section id="about" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <p>Failed to load content</p>
      </section>
    );
  }
  
  const content = aboutContent.content;
  
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading number="01" title={content.title} />
        
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-7/12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg mb-6">
                {paragraph}
              </p>
            ))}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="flex items-center">
                <GraduationCap className="text-primary mr-3 h-5 w-5" />
                <span>{content.education}</span>
              </div>
              <div className="flex items-center">
                <Languages className="text-primary mr-3 h-5 w-5" />
                <span>{content.language}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="text-primary mr-3 h-5 w-5" />
                <span>{content.location}</span>
              </div>
              <div className="flex items-center">
                <Plane className="text-primary mr-3 h-5 w-5" />
                <span>{content.relocate}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Áreas de Interesse - Substitui a antiga seção de certificações */}
          <motion.div 
            className="lg:w-5/12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                    <path d="M3 15c1 1 2 1 4 1s3 0 4-1 2-1 4-1 3 0 4 1"></path>
                    <path d="M3 21c1 0 2 0 4 0s3-1 4-1 2 0 4 0 3 1 4 1"></path>
                    <path d="M10.3 3.6c.5-1.2 2-.2 1.4.7-1.6 3-1.6 4 0 7 .5.9-1 1.9-1.4.7-1.6-3-1.6-5.4 0-8.4Z"></path>
                    <path d="m16.7 7.3 2.3-.5c1-.2 1.7 1 .7 1.3L12 10.8a1 1 0 0 1-.8 0C7.6 9.5 5 9 3.1 10.1c-.8.5-1.5-.5-.7-1.3 1.5-1.3 3.4-1.8 4.9-1.9"></path>
                  </svg>
                  Áreas de Interesse
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-2 rounded-md text-primary">
                      <Badge className="bg-transparent hover:bg-transparent border-none p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                          <line x1="6" y1="6" x2="6.01" y2="6"></line>
                          <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">Infraestrutura como Código</h4>
                      <p className="text-sm text-muted-foreground">Terraform, Ansible, CloudFormation</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-2 rounded-md text-primary">
                      <Badge className="bg-transparent hover:bg-transparent border-none p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5"></path>
                          <path d="M14 7H5"></path>
                          <path d="M19 17H5"></path>
                        </svg>
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">Orquestração de Contêineres</h4>
                      <p className="text-sm text-muted-foreground">Kubernetes, Docker Swarm</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-primary/20 p-2 rounded-md text-primary">
                      <Badge className="bg-transparent hover:bg-transparent border-none p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m12 6 4 6 5-4-2 10H5L3 8l5 4.5L12 6Z"></path>
                        </svg>
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium">CI/CD Pipelines</h4>
                      <p className="text-sm text-muted-foreground">GitHub Actions, Jenkins, GitLab CI</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
