import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
<<<<<<< HEAD
import { ThemeProvider } from './components/theme-provider'
=======
// Importa o ThemeProvider do local correto
import { ThemeProvider } from './hooks/use-theme.tsx'
>>>>>>> prod

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)