import { Link } from "wouter";
import { Mail, Linkedin, Github, Award } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { FooterLegal } from "@/components/FooterLegal";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="py-12 bg-primary-dark text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <div className="text-xl font-bold text-primary font-mono">
                &lt;tech.DevOps/&gt;
              </div>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              © {currentYear} Assis Berlanda de Medeiros. {t("footer.rights")}
            </p>
          </div>

          <div>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/in/assismedeiros/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href="https://github.com/assisberlanda"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href="mailto:berlanda.medeiros@gmail.com"
                className="footer-social-icon"
                aria-label="Email"
              >
                <Mail />
              </a>
              <a
                href="https://www.dio.me/users/dydhio_34628"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="DIO Profile"
              >
                <Award />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-muted-foreground">
          <p>
            {t("footer.builtWith")} <span className="text-primary">❤</span> {t("footer.stack")}
          </p>
          <FooterLegal />
        </div>
      </div>
    </footer>
  );
}
