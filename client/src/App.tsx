import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";
import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Router />
          <BackToTop />
          <Toaster />
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
