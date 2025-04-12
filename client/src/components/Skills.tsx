import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSkills, useAboutContent } from "@/hooks/usePortfolioContent";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/ui/skill-bar";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2, 
  Server, 
  Code, 
  BarChart3, 
  Award 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export function Skills() {
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: aboutContent, isLoading: aboutLoading } = useAboutContent();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const [categories, setCategories] = useState<string[]>([]);
  const [categorizedSkills, setCategorizedSkills] = useState<{[key: string]: any[]}>({});
  const [otherSkills, setOtherSkills] = useState<any[]>([]);
  
  // Icons for skill categories
  const categoryIcons: {[key: string]: JSX.Element} = {
    "DevOps & Cloud": <Server className="h-6 w-6 text-primary mr-2" />,
    "Desenvolvimento & Ferramentas": <Code className="h-6 w-6 text-primary mr-2" />,
    "Outras Habilidades": <BarChart3 className="h-6 w-6 text-primary mr-2" />,
  };
  
  useEffect(() => {
    if (skills) {
      // Extract unique categories excluding "Outras Habilidades"
      const mainCategories = Array.from(new Set(
        skills
          .filter(skill => skill.category !== "Outras Habilidades")
          .map(skill => skill.category)
      ));
      
      setCategories(mainCategories);
      
      // Group skills by category
      const grouped = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      }, {} as {[key: string]: any[]});
      
      setCategorizedSkills(grouped);
      setOtherSkills(grouped["Outras Habilidades"] || []);
    }
  }, [skills]);
  
  const isLoading = skillsLoading || aboutLoading;
  
  if (isLoading) {
    return (
      <section id="skills" className="py-20 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!skills || !aboutContent) {
    return (
      <section id="skills" className="py-20 flex justify-center items-center min-h-[400px]">
        <p>Failed to load skills</p>
      </section>
    );
  }
  
  const certifications = aboutContent.content.certifications;
  
  return (
    <section id="skills" className="py-20" ref={containerRef}>
      <div className="container mx-auto px-6">
        <SectionHeading number="02" title="Habilidades Técnicas" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {categories.map((category, index) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center">
                {categoryIcons[category]}
                {category}
              </h3>
              
              {categorizedSkills[category]?.map((skill) => (
                <SkillBar 
                  key={skill.id} 
                  name={skill.name} 
                  percentage={skill.proficiency} 
                />
              ))}
            </motion.div>
          ))}
        </div>
        
        {otherSkills.length > 0 && (
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold mb-8 text-center flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary mr-2" />
              Outras Habilidades
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {otherSkills.map((skill) => (
                <Badge key={skill.id} variant="outline" className="px-4 py-2 bg-primary/20 text-foreground">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Certificações */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="flex items-center">
                <Award className="h-6 w-6 text-primary mr-2" />
                Conquistas e Certificações
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certifications.map((cert, index) => (
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
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
