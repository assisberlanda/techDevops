import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { Mail, Linkedin, Github, Loader2 } from "lucide-react";
import { useContactContent } from "@/hooks/usePortfolioContent";
import { useLanguage } from "@/hooks/use-language";

export function Contact() {
  const { data: contactContent, isLoading } = useContactContent();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }

  if (!contactContent) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <p>{t("contact.failed")}</p>
      </section>
    );
  }

  const content = contactContent.content;

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading number="4" title={t("contact.title")} showNumber={true} />

        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader className="text-center">
                <CardTitle>{t("contact.info")}</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="grid md:grid-cols-1 gap-6">
                  <a 
                    href="mailto:berlanda.medeiros@gmail.com"
                    className="flex items-start space-x-4 group"
                    aria-label="Enviar e-mail"
                  >
                    <div className="contact-icon">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">Email</h4>
                      <span className="hover:text-primary transition-colors contact-link">
                        berlanda.medeiros@gmail.com
                      </span>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/in/assismedeiros/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 group"
                    aria-label="Visitar LinkedIn"
                  >
                    <div className="contact-icon">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">LinkedIn</h4>
                      <span className="hover:text-primary transition-colors contact-link">
                        linkedin.com/in/assismedeiros
                      </span>
                    </div>
                  </a>

                  <a 
                    href="http://github.com/assisberlanda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 group"
                    aria-label="Visitar GitHub"
                  >
                    <div className="contact-icon">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 group-hover:text-primary transition-colors">GitHub</h4>
                      <span className="hover:text-primary transition-colors contact-link">
                        github.com/assisberlanda
                      </span>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
