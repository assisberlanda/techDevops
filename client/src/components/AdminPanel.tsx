import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { EditHero } from "@/components/admin/EditHero";
import { EditAbout } from "@/components/admin/EditAbout";
import { EditSkills } from "@/components/admin/EditSkills";
import { EditExperiences } from "@/components/admin/EditExperiences";
import { EditProjects } from "@/components/admin/EditProjects";
import { EditContact } from "@/components/admin/EditContact";
import { Messages } from "@/components/admin/Messages";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Redirect } from "wouter";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("hero");
  const [loggedOut, setLoggedOut] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
    setLoggedOut(true);
  };

  if (loggedOut) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <Button variant="destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">Sobre</TabsTrigger>
          <TabsTrigger value="skills">Habilidades</TabsTrigger>
          <TabsTrigger value="experiences">Experiência</TabsTrigger>
          <TabsTrigger value="projects">Projetos</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="messages">Mensagens</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <EditHero />
        </TabsContent>

        <TabsContent value="about">
          <EditAbout />
        </TabsContent>

        <TabsContent value="skills">
          <EditSkills />
        </TabsContent>

        <TabsContent value="experiences">
          <EditExperiences />
        </TabsContent>

        <TabsContent value="projects">
          <EditProjects />
        </TabsContent>

        <TabsContent value="contact">
          <EditContact />
        </TabsContent>

        <TabsContent value="messages">
          <Messages />
        </TabsContent>
      </Tabs>
    </div>
  );
}
