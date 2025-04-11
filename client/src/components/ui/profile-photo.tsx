import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfilePhotoProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function ProfilePhoto({ src, alt, size = "lg", className }: ProfilePhotoProps) {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-40 w-40 md:h-60 md:w-60",
    xl: "h-64 w-64 md:h-80 md:w-80"
  };
  
  const initials = alt
    .split(" ")
    .map(name => name[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(
        "border-4 border-primary shadow-xl", 
        sizeClasses[size]
      )}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
      </Avatar>
      <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-full"></div>
      <div className="absolute -bottom-1 left-0 right-0 h-20 bg-gradient-to-t from-primary/30 to-transparent rounded-b-full"></div>
    </div>
  );
}
