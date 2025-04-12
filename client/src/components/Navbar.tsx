import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();

  const isAdminPage = location === "/admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md text-gray-900 dark:text-white"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-2">
              <img
                src="/devops.webp"
                alt="DevOps Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-primary dark:text-primary font-mono">
                DevOps.assis
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-8">
            {!isAdminPage && (
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-medium hover:text-primary transition-colors"
                        onClick={(e) => {
                          if (location !== "/") {
                            return;
                          }
                          e.preventDefault();
                          const target = document.querySelector(link.href);
                          if (target) {
                            target.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <Button
              variant="ghost"
              onClick={() => setLanguage(language === "pt-BR" ? "en-US" : "pt-BR")}
              aria-label="Toggle language"
              className="px-3 mr-2"
            >
              <Globe size={16} className="mr-1" />
              <span className="text-xs font-bold">{language === "pt-BR" ? "PT" : "EN"}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {isAdminPage && (
              <Link href="/">
                <Button variant="outline">{t("nav.backToSite")}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
