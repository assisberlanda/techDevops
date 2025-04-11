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
          
          <motion.div 
            className="lg:w-5/12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader className="border-b">
                <CardTitle>Conquistas e Certificações</CardTitle>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {content.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-primary/20 p-2 rounded-md text-primary">
                        <Badge className="bg-transparent hover:bg-transparent border-none p-0">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="bg-muted/50 flex justify-center">
                <a href="#" className="text-primary hover:underline font-medium">
                  Ver todas as certificações <span aria-hidden="true">→</span>
                </a>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
