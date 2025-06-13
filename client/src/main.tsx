import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./hooks/use-theme.tsx"; // Importe o ThemeProvider

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    {/* Envolva seu App com o ThemeProvider */}
    <ThemeProvider storageKey="theme" defaultTheme="dark">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);