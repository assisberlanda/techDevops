import { FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function DownloadCVButton() {
  const { t } = useLanguage();
  
  return (
    <a 
      href="/CV- DevOps.pdf"
      target="_blank"
      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors download-cv-btn"
    >
      <FileText className="mr-2 h-4 w-4" />
      {t("contact.downloadCV")}
    </a>
  );
}