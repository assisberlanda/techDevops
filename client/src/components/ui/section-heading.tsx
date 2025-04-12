import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  number?: string;
  title: string;
  className?: string;
  showNumber?: boolean;
}

export function SectionHeading({ number, title, className, showNumber = true }: SectionHeadingProps) {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn("text-3xl font-bold mb-12 text-center", className)}
    >
      {showNumber && number && <span className="text-primary font-mono">{number}.</span>} {title}
    </motion.h2>
  );
}
