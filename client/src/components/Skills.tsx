import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useSkills } from "@/hooks/usePortfolioContent";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/ui/skill-bar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export function Skills() {
  const { data: skills, isLoading } = useSkills();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  const [categories, setCategories] = useState<string[]>([]);
  const [categorizedSkills, setCategorizedSkills] = useState<{[key: string]: any[]}>({});
  const [otherSkills, setOtherSkills] = useState<any[]>([]);
  
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
  
  if (isLoading) {
    return (
      <section id="skills" className="py-20 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!skills) {
    return (
      <section id="skills" className="py-20 flex justify-center items-center min-h-[400px]">
        <p>Failed to load skills</p>
      </section>
    );
  }
  
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
              <h3 className="text-xl font-bold mb-6">{category}</h3>
              
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
            <h3 className="text-xl font-bold mb-8 text-center">Outras Habilidades</h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {otherSkills.map((skill) => (
                <Badge key={skill.id} variant="outline" className="px-4 py-2 bg-primary/20 text-foreground">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
