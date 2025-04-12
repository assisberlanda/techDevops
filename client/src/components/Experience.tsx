import { useExperiences } from "@/hooks/usePortfolioContent";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export function Experience() {
  const { data: experiences, isLoading } = useExperiences();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section id="experience" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <p>{t("experience.nodata")}</p>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading number="2" title={t("experience.title")} />

        <div className="max-w-3xl mx-auto">
          <div className="relative space-y-12 ml-8">
            {experiences.map((experience) => (
              <TimelineItem
                key={experience.id}
                date={`${experience.startDate}${experience.endDate ? ` - ${experience.endDate}` : ''}`}
                title={experience.position}
                subtitle={experience.company}
                description={experience.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
