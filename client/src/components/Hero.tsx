import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfilePhoto } from "@/components/ui/profile-photo";
import { useHeroContent } from "@/hooks/usePortfolioContent";
import { useLanguage } from "@/hooks/use-language";

export function Hero() {
  const { data: heroContent, isLoading } = useHeroContent();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <Button disabled className="flex items-center gap-2">
          <ArrowDownCircle className="h-5 w-5 animate-spin" />
          {t("hero.loading")}
        </Button>
      </section>
    );
  }

  if (!heroContent) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <p>{t("hero.failed")}</p>
      </section>
    );
  }

  const content = heroContent.content;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-5/12 flex justify-center order-2 lg:order-1">
            <ProfilePhoto
              src={content.photoUrl}
              alt={content.title}
              size="xl"
            />
          </div>

          <motion.div
            className="lg:w-7/12 text-center lg:text-left order-1 lg:order-2"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={item} className="text-primary font-mono mb-3">
              {t("hero.greeting")}
            </motion.p>

            <motion.h1 variants={item} className="text-4xl md:text-5xl xl:text-6xl font-bold mb-4">
              {content.title}
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-2xl md:text-3xl text-muted-foreground font-medium mb-6"
            >
              {t("hero.subtitle")}
            </motion.h2>

            <motion.p
              variants={item}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              variants={item}
              className="flex justify-center lg:justify-start mt-8 space-x-6"
            >
              <a
                href="https://www.linkedin.com/in/assismedeiros/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
              <a
                href="https://github.com/assisberlanda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385..." />
                </svg>
              </a>
              <a
                href="#contact"
                className="text-2xl hover:text-primary transition-colors"
                aria-label="Contact"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1..." />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href="#about"
            className="animate-bounce text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDownCircle className="h-8 w-8" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
