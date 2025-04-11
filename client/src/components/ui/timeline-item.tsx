import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string;
  className?: string;
}

export function TimelineItem({ date, title, subtitle, description, className }: TimelineItemProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("relative pl-8", className)}
    >
      <div className="relative">
        <div className="absolute left-[-2rem] w-0.5 h-full bg-primary/30"></div>
        <div className="absolute left-[-2.125rem] top-1 w-5 h-5 rounded-full bg-primary border-[3px] border-background dark:border-background-dark"></div>
      </div>
      
      <div className="mb-2">
        <span className="text-primary font-mono">{date}</span>
      </div>
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-lg text-muted-foreground mb-2">{subtitle}</p>
      <p className="mb-4">{description}</p>
    </motion.div>
  );
}
