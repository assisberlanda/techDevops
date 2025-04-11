import { useState } from "react";
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
import { useHeroContent, useUpdatePortfolioContent } from "@/hooks/usePortfolioContent";
import { ProfilePhoto } from "@/components/ui/profile-photo";

const heroFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  subtitle: z.string().min(5, {
    message: "O subtítulo deve ter pelo menos 5 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  photoUrl: z.string().url({
    message: "Por favor, insira uma URL válida para a foto.",
  }),
  cvUrl: z.string().url({
    message: "Por favor, insira uma URL válida para o CV.",
  }),
});

type HeroFormValues = z.infer<typeof heroFormSchema>;

export function EditHero() {
  const { data: heroContent, isLoading } = useHeroContent();
  const updateContent = useUpdatePortfolioContent<HeroFormValues>("hero");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<HeroFormValues>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      photoUrl: "",
      cvUrl: "",
    },
  });

  // Update form when data is loaded
  useState(() => {
    if (heroContent) {
      const content = heroContent.content;
      form.reset({
        title: content.title,
        subtitle: content.subtitle,
        description: content.description,
        photoUrl: content.photoUrl,
        cvUrl: content.cvUrl,
      });
    }
  });

  async function onSubmit(values: HeroFormValues) {
    setIsSubmitting(true);
    try {
      await updateContent.mutateAsync(values);
      toast({
        title: "Conteúdo atualizado",
        description: "A seção Hero foi atualizada com sucesso.",
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
        <CardTitle>Editar Seção Hero</CardTitle>
        <CardDescription>
          Personalize a seção principal do seu portfólio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormDescription>
                        Este é o seu nome completo que aparece em destaque.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtítulo</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua profissão" {...field} />
                      </FormControl>
                      <FormDescription>
                        Sua profissão ou cargo atual.
                      </FormDescription>
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
                          placeholder="Breve descrição sobre você"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Uma breve descrição sobre você e suas habilidades.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="photoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Foto</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com/foto.jpg" {...field} />
                      </FormControl>
                      <FormDescription>
                        Link para sua foto de perfil.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do CV</FormLabel>
                      <FormControl>
                        <Input placeholder="https://exemplo.com/cv.pdf" {...field} />
                      </FormControl>
                      <FormDescription>
                        Link para download do seu currículo.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-4">Prévia da Foto</h3>
            {form.watch("photoUrl") ? (
              <ProfilePhoto
                src={form.watch("photoUrl")}
                alt={form.watch("title") || "Foto de perfil"}
                size="lg"
              />
            ) : (
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-full h-60 w-60 flex items-center justify-center text-muted-foreground">
                Prévia da foto
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
