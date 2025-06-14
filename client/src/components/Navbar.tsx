import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [location] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isAdminPage = location === "/admin";
  
  // Função para fechar o menu ao clicar em um link
  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location !== "/") {
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Função para fechar o menu mobile
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fechar o menu mobile quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target as Node) && 
          !(event.target as Element).closest('.mobile-menu-button')) {
        closeMenu();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2">
              <img
                src={theme === "dark" ? "/devops_dark.webp" : "/devops_light.webp"}
                alt="DevOps Logo"
                className="h-8 sm:h-10 w-auto object-contain transition-all duration-300"
              />
              <span className="text-xl sm:text-2xl font-bold text-primary dark:text-primary font-mono">
                tech.DevOps
              </span>
            </div>
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4 md:space-x-8">
            {!isAdminPage && (
              <>
                {/* Navigation para Desktop */}
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
                
                {/* Botão do menu mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden mobile-menu-button"
                  onClick={() => isMobileMenuOpen ? closeMenu() : setIsMobileMenuOpen(true)}
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="theme-toggle-button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Back to Site Button */}
            {isAdminPage && (
              <Link href="/">
                <Button variant="outline">{t("nav.backToSite")}</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Menu Mobile */}
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