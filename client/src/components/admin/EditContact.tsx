import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContactContent, useUpdatePortfolioContent } from "@/hooks/usePortfolioContent";

const contactFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  linkedin: z.string().url({
    message: "Digite uma URL válida para o LinkedIn.",
  }),
  github: z.string().url({
    message: "Digite uma URL válida para o GitHub.",
  }),
  location: z.string().min(3, {
    message: "A localização deve ter pelo menos 3 caracteres.",
  }),
  relocate: z.string().min(3, {
    message: "A informação de relocação deve ter pelo menos 3 caracteres.",
  }),
  dioProfile: z.string().url({
    message: "Digite uma URL válida para o perfil DIO.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function EditContact() {
  const { data: contactContent, isLoading } = useContactContent();
  const updateContent = useUpdatePortfolioContent<ContactFormValues>("contact");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      title: "",
      description: "",
      email: "",
      linkedin: "",
      github: "",
      location: "",
      relocate: "",
      dioProfile: "",
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (contactContent) {
      const content = contactContent.content;
      form.reset({
        title: content.title,
        description: content.description,
        email: content.email,
        linkedin: content.linkedin,
        github: content.github,
        location: content.location,
        relocate: content.relocate,
        dioProfile: content.dioProfile,
      });
    }
  }, [contactContent, form]);

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await updateContent.mutateAsync(values);
      toast({
        title: "Conteúdo atualizado",
        description: "A seção de Contato foi atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o conteúdo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Editar Informações de Contato</CardTitle>
        <CardDescription>
          Atualize suas informações de contato e redes sociais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Entre em Contato" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva como os visitantes podem entrar em contato" 
                      rows={3}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.linkedin.com/in/seu-perfil" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/seu-usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dioProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Perfil DIO</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.dio.me/users/seu-usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Localização</FormLabel>
                    <FormControl>
                      <Input placeholder="Cidade, Estado - País" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="relocate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relocação</FormLabel>
                    <FormControl>
                      <Input placeholder="Disponível para relocação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
