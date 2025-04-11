import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Award, 
  FileText, 
  Loader2 
} from "lucide-react";
import { useContactContent } from "@/hooks/usePortfolioContent";
import { useLanguage } from "@/hooks/use-language";

export function Contact() {
  const { data: contactContent, isLoading } = useContactContent();
  const { t, language } = useLanguage();
  
  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!contactContent) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <p>Failed to load contact information</p>
      </section>
    );
  }
  
  const content = contactContent.content;
  
  // Determine CV path based on language
  const cvPath = language === "pt-BR" ? "/CV- DevOps.pdf" : "/CV-Intership_TI.pdf";
  
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading number="4" title={t("contact.title")} />
        
        <motion.p 
          className="text-lg text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {content.description}
        </motion.p>
        
        <div className="flex justify-center">
          <motion.div 
            className="w-full max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle>{t("contact.info")}</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a 
                        href={`mailto:${content.email}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {content.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">LinkedIn</h4>
                      <a 
                        href={content.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary transition-colors"
                      >
                        linkedin.com/in/assismedeiros
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">GitHub</h4>
                      <a 
                        href={content.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary transition-colors"
                      >
                        github.com/assisberlanda
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{t("contact.location")}</h4>
                      <p>{content.location}</p>
                      <p className="text-sm text-muted-foreground mt-1">{content.relocate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t flex justify-center">
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={cvPath}
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {t("contact.downloadCV")}
                    </a>
                    <a 
                      href={content.dioProfile} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      {t("contact.dioProfile")}
                    </a>
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
