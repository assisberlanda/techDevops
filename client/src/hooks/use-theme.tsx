import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = window.localStorage.getItem(storageKey) as Theme;
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

    // Lógica corrigida: nunca remove a classe antes de saber qual adicionar.
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      console.warn("Failed to set theme in localStorage", e);
    }
  }, [theme, storageKey]);
  
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
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