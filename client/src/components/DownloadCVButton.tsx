import { FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function DownloadCVButton() {
  const { language, t } = useLanguage();
  
  // Determine CV path based on language
  const cvPath = language === "pt-BR" ? "/CV- DevOps.pdf" : "/CV-Intership_TI.pdf";
  
  return (
    <a 
      href={cvPath}
      target="_blank"
      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors"
    >
      <FileText className="mr-2 h-4 w-4" />
      {t("contact.downloadCV")}
    </a>
  );
}