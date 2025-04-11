import { Link } from "wouter";
import { Mail, Linkedin, Github, Award } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-primary-dark text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <a className="text-xl font-bold text-primary font-mono">
                &lt;assis.dev/&gt;
              </a>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              © {currentYear} Assis Berlanda de Medeiros. Todos os direitos reservados.
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
          <p>Desenvolvido com <span className="text-primary">❤</span> usando React, Tailwind CSS e TypeScript</p>
          <p className="mt-2">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a> | 
            <a href="#" className="hover:text-primary transition-colors ml-2">Política de Privacidade</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
