import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location"; // <-- CORREÇÃO: Importação nomeada
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

function AppRouter() {
  return (
    // ---> CORREÇÃO: Usar o hook aqui para navegação baseada em hash
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/admin" component={Admin} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-use" component={TermsOfUse} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <AppRouter />
        <BackToTop />
        <Toaster />
      </QueryClientProvider>
    </LanguageProvider>
  );
}

export default App;