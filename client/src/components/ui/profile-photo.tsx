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
      <div className={cn(
        "border-4 border-primary rounded-full shadow-xl overflow-hidden",
        sizeClasses[size]
      )}>
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover"
          onError={(e) => {
            // Exibe iniciais se a imagem falhar ao carregar
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement!.setAttribute('data-initials', initials);
            e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
          }}
        />
      </div>
    </div>
  );
}
