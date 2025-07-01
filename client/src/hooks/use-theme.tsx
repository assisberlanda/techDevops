import { createContext, useContext, useEffect, useState, useMemo } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}: ThemeProviderProps) {
<<<<<<< HEAD
  const [theme, setThemeState] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    // No modo "system", sempre preferir o tema escuro
    // independentemente das configurações do sistema
    if (theme === "system") {
      root.classList.add("dark");
      return;
=======
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = window.localStorage.getItem(storageKey);
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    } catch (e) {
      console.warn("Failed to read theme from localStorage", e);
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
>>>>>>> prod
    }
    
    root.classList.add(theme);
  }, [theme]);
  
  const setTheme = (theme: Theme) => {
    localStorage.setItem("theme", theme);
    setThemeState(theme);
  };

  const contextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};