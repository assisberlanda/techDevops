import { Link } from "wouter";
import { Mail, Linkedin, Github, Award } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

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
                &lt;assis.dev/&gt;
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
                className="text-xl hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin />
              </a>
              <a
                href="https://github.com/assisberlanda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github />
              </a>
              <a
                href="mailto:berlanda.medeiros@gmail.com"
                className="text-xl hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail />
              </a>
              <a
                href="https://www.dio.me/users/dydhio_34628"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary transition-colors"
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
          <p className="mt-2">
            <span className="hover:text-primary transition-colors">
              {t("footer.terms")}
            </span>{" "}
            |{" "}
            <span className="hover:text-primary transition-colors ml-2">
              {t("footer.privacy")}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
