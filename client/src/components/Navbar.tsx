import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/hooks/use-language";
import { useOnClickOutside } from "../hooks/use-click-outside";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [location] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isAdminPage = location === "/admin";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useOnClickOutside(mobileMenuRef, () => setMobileMenuOpen(false));

  const navigationLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#experience", label: t("nav.experience") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#contact", label: t("nav.contact") },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location !== "/") {
      return;
    }
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

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
                src="/devops.webp"
                alt="DevOps Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-primary dark:text-primary font-mono">
                DevOps.assis
              </span>
            </div>
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {!isAdminPage && (
              <nav className="hidden md:block">
                <ul className="flex space-x-8">
                  {navigationLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="font-medium hover:text-primary transition-colors"
                        onClick={(e) => scrollToSection(e, link.href)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>

            {/* Mobile Menu Button */}
            {!isAdminPage && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            )}

            {/* Back to Site Button */}
            {isAdminPage && (
              <Link href="/">
                <Button variant="outline">{t("nav.backToSite")}</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !isAdminPage && (
          <div 
            ref={mobileMenuRef}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-lg shadow-lg mt-4 p-4 transition-all duration-300 absolute left-6 right-6"
          >
            <ul className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2 px-4 hover:bg-primary/10 hover:text-primary rounded-md transition-colors font-medium"
                    onClick={(e) => scrollToSection(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}