import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { LanguageProvider } from "@/hooks/use-language";
import hashLocationHook from 'wouter/use-hash-location';

// ---> REMOVIDO: A importação do ThemeProvider daqui.
// import { ThemeProvider } from "@/hooks/use-theme";

function AppRouter() {
  return (
    <WouterRouter hook={hashLocationHook}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    // ---> REMOVIDO: O ThemeProvider que estava aqui.
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRouter />
        <BackToTop />
        <Toaster />
      </QueryClientProvider>
    </LanguageProvider>
    // ---> REMOVIDO: O ThemeProvider que estava aqui.
  );
}

export default App;