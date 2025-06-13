// Caminho: client/src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// Importa o ThemeProvider do local correto
import { ThemeProvider } from './components/theme-provider' // <- Corrigido para remover o .tsx da importação

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Este é o único ThemeProvider que o app deve ter */}
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)