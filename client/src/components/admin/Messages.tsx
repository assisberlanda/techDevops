import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  Trash2, 
  Mail, 
  MailOpen,
  ArrowUpDown,
  Search
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminContactMessages, useMarkMessageAsRead, useDeleteContactMessage } from "@/hooks/usePortfolioContent";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Messages() {
  const { data: messages, isLoading } = useAdminContactMessages();
  const markAsRead = useMarkMessageAsRead();
  const deleteMessage = useDeleteContactMessage();
  const [filter, setFilter] = useState("");
  const [sortNewest, setSortNewest] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const { toast } = useToast();

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead.mutateAsync(id);
      toast({
        description: "Mensagem marcada como lida.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível marcar a mensagem como lida.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage.mutateAsync(id);
      toast({
        title: "Mensagem excluída",
        description: "A mensagem foi excluída com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a mensagem.",
        variant: "destructive",
      });
    }
  };

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const toggleSort = () => {
    setSortNewest(!sortNewest);
  };

  // Filter and sort messages
  const filteredMessages = messages
    ? messages.filter(
        msg =>
          msg.name.toLowerCase().includes(filter.toLowerCase()) ||
          msg.email.toLowerCase().includes(filter.toLowerCase()) ||
          msg.subject.toLowerCase().includes(filter.toLowerCase()) ||
          msg.message.toLowerCase().includes(filter.toLowerCase())
      )
    : [];
    
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortNewest ? dateB - dateA : dateA - dateB;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Mensagens de Contato</CardTitle>
            <Button variant="outline" onClick={toggleSort}>
              <ArrowUpDown className="mr-2 h-4 w-4" />
              {sortNewest ? "Mais recentes primeiro" : "Mais antigas primeiro"}
            </Button>
          </div>
          <CardDescription>
            Gerencie as mensagens enviadas através do formulário de contato
          </CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar mensagens..."
              className="pl-8"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedMessages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {filter 
                  ? "Nenhuma mensagem corresponde à sua pesquisa." 
                  : "Nenhuma mensagem recebida."}
              </p>
            ) : (
              sortedMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`border rounded-lg p-4 relative ${
                    message.isRead ? "bg-background" : "bg-muted/20"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{message.name}</h3>
                        {!message.isRead && (
                          <Badge variant="default" className="bg-primary text-white">
                            Nova
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {message.email}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.createdAt).toLocaleDateString()}{" "}
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  
                  <h4 className="font-medium mb-1">{message.subject}</h4>
                  <p className="text-sm line-clamp-2 mb-4">{message.message}</p>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewMessage(message)}
                    >
                      Ver Detalhes
                    </Button>
                    {!message.isRead && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMarkAsRead(message.id)}
                        title="Marcar como lida"
                      >
                        <MailOpen className="h-4 w-4" />
                      </Button>
                    )}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" title="Excluir mensagem">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(message.id)}>
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedMessage} onOpenChange={open => !open && setSelectedMessage(null)}>
        {selectedMessage && (
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedMessage.subject}</DialogTitle>
              <DialogDescription>
                De: {selectedMessage.name} ({selectedMessage.email})
                <br />
                Data: {new Date(selectedMessage.createdAt).toLocaleDateString()}{" "}
                {new Date(selectedMessage.createdAt).toLocaleTimeString()}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <p className="whitespace-pre-line">{selectedMessage.message}</p>
            </div>
            <div className="flex justify-between mt-6">
              <Button 
                variant="outline"
                onClick={() => setSelectedMessage(null)}
              >
                Fechar
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="ghost"
                  onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Responder por Email
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir Mensagem
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja excluir esta mensagem? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        handleDelete(selectedMessage.id);
                        setSelectedMessage(null);
                      }}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
