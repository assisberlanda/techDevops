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
import { 
  Loader2, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Check, 
  X,
  Star,
  StarOff,
  Eye,
  EyeOff,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useProjects, 
  useCreateProject, 
  useUpdateProject, 
  useDeleteProject 
} from "@/hooks/usePortfolioContent";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import { Switch } from "@/components/ui/switch";
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

const MAX_TAGS = 5;

const projectFormSchema = z.object({
  title: z.string().min(3, {
    message: "O título deve ter pelo menos 3 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  tags: z.array(z.string()).min(1, {
    message: "Adicione pelo menos uma tag.",
  }).max(MAX_TAGS, {
    message: `Você pode adicionar no máximo ${MAX_TAGS} tags.`,
  }),
  repoUrl: z.string().url({
    message: "Digite uma URL válida.",
  }).optional().or(z.literal("")),
  demoUrl: z.string().url({
    message: "Digite uma URL válida.",
  }).optional().or(z.literal("")),
  isVisible: z.boolean().default(true),
  isFeatured: z.boolean().default(false)
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function EditProjects() {
  const { data: projects, isLoading } = useProjects();
  const { data: githubRepos, isLoading: isLoadingRepos } = useGithubRepos();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      repoUrl: "",
      demoUrl: "",
      isVisible: true,
      isFeatured: false
    },
  });

  const tags = form.watch("tags");

  const resetForm = () => {
    form.reset({
      title: "",
      description: "",
      tags: [],
      repoUrl: "",
      demoUrl: "",
      isVisible: true,
      isFeatured: false
    });
    setEditingId(null);
    setNewTag("");
  };

  const handleEdit = (project: any) => {
    form.reset({
      title: project.title,
      description: project.description,
      tags: project.tags,
      repoUrl: project.repoUrl || "",
      demoUrl: project.demoUrl || "",
      isVisible: project.isVisible,
      isFeatured: project.isFeatured
    });
    setEditingId(project.id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleImportFromGithub = (repo: any) => {
    form.setValue("title", repo.name);
    form.setValue("description", repo.description || "");
    form.setValue("repoUrl", repo.html_url);
    
    // Set tags based on language and topics
    const tagsToAdd = [];
    if (repo.language) tagsToAdd.push(repo.language);
    if (repo.topics && Array.isArray(repo.topics)) {
      tagsToAdd.push(...repo.topics.slice(0, MAX_TAGS - tagsToAdd.length));
    }
    
    form.setValue("tags", tagsToAdd.slice(0, MAX_TAGS));
  };

  const addTag = () => {
    if (!newTag.trim()) {
      toast({
        description: "Por favor, digite uma tag válida.",
      });
      return;
    }
    
    if (tags.includes(newTag.trim())) {
      toast({
        description: "Esta tag já foi adicionada.",
      });
      return;
    }
    
    if (tags.length >= MAX_TAGS) {
      toast({
        description: `Você só pode adicionar até ${MAX_TAGS} tags.`,
      });
      return;
    }
    
    form.setValue("tags", [...tags, newTag.trim()]);
    setNewTag("");
  };

  const removeTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleToggleVisibility = async (id: number, currentVisibility: boolean) => {
    try {
      await updateProject.mutateAsync({
        id,
        data: { isVisible: !currentVisibility }
      });
      toast({
        title: "Projeto atualizado",
        description: `Projeto ${currentVisibility ? "ocultado" : "exibido"} com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a visibilidade do projeto.",
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = async (id: number, currentFeatured: boolean) => {
    try {
      await updateProject.mutateAsync({
        id,
        data: { isFeatured: !currentFeatured }
      });
      toast({
        title: "Projeto atualizado",
        description: `Projeto ${currentFeatured ? "removido dos" : "adicionado aos"} destaques com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status de destaque do projeto.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProject.mutateAsync(id);
      toast({
        title: "Projeto excluído",
        description: "O projeto foi excluído com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o projeto.",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(values: ProjectFormValues) {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateProject.mutateAsync({ id: editingId, data: values });
        toast({
          title: "Projeto atualizado",
          description: "O projeto foi atualizado com sucesso.",
        });
      } else {
        await createProject.mutateAsync(values);
        toast({
          title: "Projeto adicionado",
          description: "O projeto foi adicionado com sucesso.",
        });
      }
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar o projeto.",
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
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Adicionar/Editar Projeto</CardTitle>
          <CardDescription>
            {editingId ? "Edite um projeto existente" : "Adicione um novo projeto ao seu portfólio"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Projeto</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Docker Compose Collection" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Importar de Repositório</FormLabel>
                  <div className="w-full">
                    <select 
                      className="w-full p-2 border rounded"
                      disabled={isLoadingRepos}
                      onChange={(e) => {
                        const repoId = e.target.value;
                        if (repoId && githubRepos) {
                          const repo = githubRepos.find(r => r.id.toString() === repoId);
                          if (repo) {
                            handleImportFromGithub(repo);
                          }
                        }
                        e.target.value = "";
                      }}
                    >
                      <option value="">Selecione um repositório...</option>
                      {githubRepos?.map((repo) => (
                        <option key={repo.id} value={repo.id}>
                          {repo.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isLoadingRepos ? "Carregando repositórios..." : "Selecione um repositório para preencher automaticamente"}
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva o projeto em detalhes" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Tags</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="py-1">
                      {tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage>{form.formState.errors.tags?.message}</FormMessage>
                <p className="text-sm text-muted-foreground mt-2">
                  Limite de {MAX_TAGS} tags ({tags.length}/{MAX_TAGS})
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="repoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL do Repositório</FormLabel>
                      <FormControl>
                        <Input placeholder="https://github.com/seu-usuario/seu-repo" {...field} />
                      </FormControl>
                      <FormDescription>
                        Link para o repositório do projeto (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="demoUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Demo</FormLabel>
                      <FormControl>
                        <Input placeholder="https://demo-do-seu-projeto.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        Link para uma demonstração do projeto (opcional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isVisible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Visibilidade</FormLabel>
                        <FormDescription>
                          Mostrar este projeto no portfólio
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Destacado</FormLabel>
                        <FormDescription>
                          Exibir este projeto na seção de destaques
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : editingId ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Atualizar Projeto
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Projeto
                    </>
                  )}
                </Button>
                
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancelar Edição
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projetos Existentes</CardTitle>
          <CardDescription>
            Gerencie seus projetos existentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects && projects.length === 0 ? (
              <p className="text-center text-muted-foreground py-8 col-span-2">
                Nenhum projeto cadastrado.
              </p>
            ) : (
              projects?.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{project.title}</h3>
                      {project.isFeatured && (
                        <Badge variant="default" className="bg-primary text-white">
                          Destaque
                        </Badge>
                      )}
                      {!project.isVisible && (
                        <Badge variant="outline">
                          Oculto
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleToggleVisibility(project.id, project.isVisible)}
                      title={project.isVisible ? "Ocultar projeto" : "Mostrar projeto"}
                    >
                      {project.isVisible ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleToggleFeatured(project.id, project.isFeatured)}
                      title={project.isFeatured ? "Remover dos destaques" : "Adicionar aos destaques"}
                    >
                      {project.isFeatured ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(project)}
                      title="Editar projeto"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" title="Excluir projeto">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o projeto "{project.title}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(project.id)}>
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
    </div>
  );
}
