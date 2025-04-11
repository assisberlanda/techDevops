import { useEffect, useState } from "react";
import { Redirect } from "wouter";
import { AdminPanel } from "@/components/AdminPanel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  // Check if already authenticated (has valid token in storage)
  useEffect(() => {
    const token = localStorage.getItem("admin-token");
    if (token === "admin123") { // In a real app, we would validate the token server-side
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - in a real app this would use a proper auth system
    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        localStorage.setItem("admin-token", "admin123");
        setIsAuthenticated(true);
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao painel de administração.",
        });
      } else {
        toast({
          title: "Falha no login",
          description: "Usuário ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isAuthenticated) {
    return <AdminPanel />;
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-2xl">Painel Administrativo</CardTitle>
            <CardDescription>
              Entre com suas credenciais para editar o conteúdo do portfólio
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Autenticando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </main>
  );
}
