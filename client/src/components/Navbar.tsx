import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  
  const isAdminPage = location === "/admin";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const navLinks = [
    { href: "#about", label: "1. Sobre Mim" },
    { href: "#experience", label: "2. Experiências Profissionais" },
    { href: "#projects", label: "3. Projetos" },
    { href: "#contact", label: "4. Contato" }
  ];
  
  return (
    <header className={cn(
      "fixed w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 dark:bg-primary-dark/90 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-primary dark:text-primary font-mono flex items-center gap-2">
              <span>🔄</span> <span>DevOps.assis</span>
            </a>
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
                          if (location !== '/') {
                            return;
                          }
                          e.preventDefault();
                          const target = document.querySelector(link.href);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
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
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            
            {isAdminPage && (
              <Link href="/">
                <Button variant="outline">Voltar ao site</Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-primary-dark shadow-lg"
        >
          <nav className="container mx-auto px-6 py-4">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="block py-2 hover:text-primary transition-colors"
                    onClick={(e) => {
                      if (location !== '/') {
                        return;
                      }
                      e.preventDefault();
                      const target = document.querySelector(link.href);
                      if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        closeMobileMenu();
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
