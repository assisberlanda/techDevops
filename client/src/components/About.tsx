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
import { useLanguage } from "@/hooks/use-language";

export function About() {
  const { data: aboutContent, isLoading } = useAboutContent();
  const { language, t } = useLanguage();
  
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
        <SectionHeading number="1" title={t("about.title")} />
        
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
          
          <motion.div 
            className="lg:w-5/12 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Perfil comportamental */}
            <Card>
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  {t("about.profile.title")}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/10 p-4 rounded-md text-primary flex-shrink-0 w-24 h-24 flex items-center justify-center">
                      {/* Gráfico simplificado Mindsight */}
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                        <path d="M40 2 A38 38 0 0 1 70 40" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path d="M40 2 A38 38 0 0 1 10 40" stroke="currentColor" strokeWidth="4" fill="none" />
                        <circle cx="40" cy="40" r="4" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-medium mb-1">Análise Mindsight</h4>
                      <p className="text-sm text-muted-foreground mb-2">Avaliação de competências e perfil de gestão</p>
                      <a 
                        href="https://app.mindsight.com.br/devolutiva/19136343/devolutiva_gestor/?code=0c5e93b6-967a-404d-b243-9d32152451a5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Ver resultados completos
                        <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    <div className="bg-primary/10 p-4 rounded-md text-primary flex-shrink-0 w-24 h-24 flex items-center justify-center">
                      {/* Gráfico simplificado Gupy */}
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <rect x="10" y="50" width="12" height="25" fill="currentColor" fillOpacity="0.7" />
                        <rect x="25" y="30" width="12" height="45" fill="currentColor" fillOpacity="0.8" />
                        <rect x="40" y="20" width="12" height="55" fill="currentColor" fillOpacity="0.9" />
                        <rect x="55" y="35" width="12" height="40" fill="currentColor" fillOpacity="0.7" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-lg font-medium mb-1">Mapeamento Gupy</h4>
                      <p className="text-sm text-muted-foreground mb-2">Análise de perfil comportamental e competências</p>
                      <a 
                        href="https://assessments.gupy.io/behavioral/60a52f0f01664007a3277401634f9e9c/results/recruiter?utm_campaign=behavioral&utm_medium=shared&utm_source=mapping"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:underline"
                      >
                        Ver resultados completos
                        <svg className="ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Áreas de Interesse */}
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
