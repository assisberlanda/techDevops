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
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAboutContent, useUpdatePortfolioContent } from "@/hooks/usePortfolioContent";

const certificationSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  issuer: z.string().min(2, "O emissor deve ter pelo menos 2 caracteres")
});

const aboutFormSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  paragraphs: z.array(z.string().min(10, {
    message: "Cada parágrafo deve ter pelo menos 10 caracteres.",
  })).min(1, "Adicione pelo menos um parágrafo"),
  education: z.string().min(5, {
    message: "A educação deve ter pelo menos 5 caracteres.",
  }),
  language: z.string().min(3, {
    message: "O idioma deve ter pelo menos 3 caracteres.",
  }),
  location: z.string().min(3, {
    message: "A localização deve ter pelo menos 3 caracteres.",
  }),
  relocate: z.string().min(3, {
    message: "A informação de relocação deve ter pelo menos 3 caracteres.",
  }),
  certifications: z.array(certificationSchema).min(1, "Adicione pelo menos uma certificação")
});

type AboutFormValues = z.infer<typeof aboutFormSchema>;

export function EditAbout() {
  const { data: aboutContent, isLoading } = useAboutContent();
  const updateContent = useUpdatePortfolioContent<AboutFormValues>("about");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paragraphs, setParagraphs] = useState<string[]>([""]);
  const { toast } = useToast();

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutFormSchema),
    defaultValues: {
      title: "",
      paragraphs: [""],
      education: "",
      language: "",
      location: "",
      relocate: "",
      certifications: [{ name: "", issuer: "" }]
    },
  });

  // Update form when data is loaded
  useEffect(() => {
    if (aboutContent) {
      const content = aboutContent.content;
      setParagraphs(content.paragraphs);
      form.reset({
        title: content.title,
        paragraphs: content.paragraphs,
        education: content.education,
        language: content.language,
        location: content.location,
        relocate: content.relocate,
        certifications: content.certifications
      });
    }
  }, [aboutContent, form]);

  const addParagraph = () => {
    const updatedParagraphs = [...form.getValues("paragraphs"), ""];
    form.setValue("paragraphs", updatedParagraphs);
    setParagraphs(updatedParagraphs);
  };

  const removeParagraph = (index: number) => {
    if (form.getValues("paragraphs").length <= 1) {
      toast({
        title: "Erro",
        description: "Você deve ter pelo menos um parágrafo.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedParagraphs = form.getValues("paragraphs").filter((_, i) => i !== index);
    form.setValue("paragraphs", updatedParagraphs);
    setParagraphs(updatedParagraphs);
  };

  const addCertification = () => {
    const currentCertifications = form.getValues("certifications");
    form.setValue("certifications", [...currentCertifications, { name: "", issuer: "" }]);
  };

  const removeCertification = (index: number) => {
    if (form.getValues("certifications").length <= 1) {
      toast({
        title: "Erro",
        description: "Você deve ter pelo menos uma certificação.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCertifications = form.getValues("certifications").filter((_, i) => i !== index);
    form.setValue("certifications", updatedCertifications);
  };

  async function onSubmit(values: AboutFormValues) {
    setIsSubmitting(true);
    try {
      await updateContent.mutateAsync(values);
      toast({
        title: "Conteúdo atualizado",
        description: "A seção Sobre foi atualizada com sucesso.",
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
        <CardTitle>Editar Seção Sobre</CardTitle>
        <CardDescription>
          Compartilhe mais informações sobre você, sua formação e certificações.
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
                    <Input placeholder="Sobre Mim" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Parágrafos</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addParagraph}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Parágrafo
                </Button>
              </div>
              
              {form.getValues("paragraphs").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <FormField
                    control={form.control}
                    name={`paragraphs.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Textarea
                            placeholder={`Parágrafo ${index + 1}`}
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon"
                    onClick={() => removeParagraph(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Educação</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua formação acadêmica" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idioma</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nível de idioma" {...field} />
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
                      <Input placeholder="Onde você mora" {...field} />
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
                      <Input placeholder="Disponibilidade para relocação" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>Certificações</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addCertification}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Certificação
                </Button>
              </div>
              
              {form.getValues("certifications").map((_, index) => (
                <div key={index} className="flex gap-2">
                  <div className="grid grid-cols-2 gap-2 flex-1">
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Nome da certificação" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`certifications.${index}.issuer`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Emissor" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="icon"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
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
