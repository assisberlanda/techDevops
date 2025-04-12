import { useExperiences } from "@/hooks/usePortfolioContent";
import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

// Helper to get translated experience data
function getTranslatedExperienceKey(position: string): string {
  if (position.includes("Fiscal") || position.includes("Civil Aviation")) {
    return "civilAviation";
  } else if (position.includes("Programador") || position.includes("Programmer")) {
    return "programmer";
  } else if (position.includes("Professor") || position.includes("English Teacher")) {
    return "english";
  }
  return "";
}

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
        <SectionHeading title={t("experience.title")} />

        <div className="max-w-3xl mx-auto">
          <div className="relative space-y-12 ml-8">
            {experiences.map((experience) => {
              const expKey = getTranslatedExperienceKey(experience.position);
              return (
                <TimelineItem
                  key={experience.id}
                  date={`${experience.startDate}${experience.endDate ? ` - ${experience.endDate}` : ''}`}
                  title={expKey ? t(`experience.${expKey}`) : experience.position}
                  subtitle={expKey ? t(`experience.${expKey}.company`) : experience.company}
                  description={expKey ? t(`experience.${expKey}.description`) : experience.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
