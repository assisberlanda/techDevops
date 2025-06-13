import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [location, navigate] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isAdminPage = location.startsWith("/admin");
  
  const handleLinkClick = (hash: string) => {
    setIsMobileMenuOpen(false);
    
    if (location !== "/") {
      navigate(`/${hash}`);
    } else {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && !(event.target as Element).closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center gap-2 cursor-pointer">
              <img
                src={theme === "dark" ? "/devops_dark.webp" : "/devops_light.webp"}
                alt="DevOps Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-300"
              />
              <span className="text-xl sm:text-2xl font-bold text-primary dark:text-primary font-mono">
                tech.DevOps
              </span>
            </a>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-8">
            {!isAdminPage && (
              <>
                <nav className="hidden md:block">
                  <ul className="flex space-x-8">
                    {[
                      { href: "#about", label: t("nav.about") },
                      { href: "#experience", label: t("nav.experience") },
                      { href: "#projects", label: t("nav.projects") },
                      { href: "#contact", label: t("nav.contact") },
                    ].map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="font-medium text-primary hover:text-white hover:bg-blue-700 dark:text-emerald-300 dark:hover:text-slate-900 dark:hover:bg-emerald-300 px-3 py-1 rounded-md transition-all"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(link.href);
                          }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mobile-menu-button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="theme-toggle-button"
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
      
      {!isAdminPage && isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg overflow-hidden z-50 border-t mobile-menu"
        >
          <ul className="p-4 space-y-4">
            {[
              { href: "#about", label: t("nav.about") },
              { href: "#experience", label: t("nav.experience") },
              { href: "#projects", label: t("nav.projects") },
              { href: "#contact", label: t("nav.contact") },
            ].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-2 px-4 rounded-md font-medium transition-all text-blue-700 dark:text-emerald-300 hover:text-white hover:bg-blue-700 dark:hover:text-slate-900 dark:hover:bg-emerald-300 hover:shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}