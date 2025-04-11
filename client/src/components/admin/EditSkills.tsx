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
import { Button } from "@/components/ui/button";
import { 
  Loader2, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Check, 
  X,
  Eye, 
  EyeOff 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useSkills, 
  useCreateSkill, 
  useUpdateSkill, 
  useDeleteSkill 
} from "@/hooks/usePortfolioContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { SkillBar } from "@/components/ui/skill-bar";
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

const skillFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  category: z.string().min(2, {
    message: "A categoria deve ter pelo menos 2 caracteres.",
  }),
  proficiency: z.number().min(1).max(100),
  isVisible: z.boolean().default(true),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

export function EditSkills() {
  const { data: skills, isLoading } = useSkills();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { toast } = useToast();

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: 50,
      isVisible: true,
    },
  });

  const resetForm = () => {
    form.reset({
      name: "",
      category: "",
      proficiency: 50,
      isVisible: true,
    });
    setEditingId(null);
  };

  const handleEdit = (skill: any) => {
    form.reset({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency,
      isVisible: skill.isVisible,
    });
    setEditingId(skill.id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleToggleVisibility = async (id: number, currentVisibility: boolean) => {
    try {
      await updateSkill.mutateAsync({
        id,
        data: { isVisible: !currentVisibility }
      });
      toast({
        title: "Habilidade atualizada",
        description: `Habilidade ${currentVisibility ? "ocultada" : "exibida"} com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a visibilidade da habilidade.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSkill.mutateAsync(id);
      toast({
        title: "Habilidade excluída",
        description: "A habilidade foi excluída com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a habilidade.",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(values: SkillFormValues) {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateSkill.mutateAsync({ id: editingId, data: values });
        toast({
          title: "Habilidade atualizada",
          description: "A habilidade foi atualizada com sucesso.",
        });
      } else {
        await createSkill.mutateAsync(values);
        toast({
          title: "Habilidade adicionada",
          description: "A habilidade foi adicionada com sucesso.",
        });
      }
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar a habilidade.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Get unique categories
  const categories = skills 
    ? Array.from(new Set(skills.map(skill => skill.category))) 
    : [];

  // Filter skills based on selected category
  const filteredSkills = skills 
    ? (categoryFilter === "all" 
        ? skills 
        : skills.filter(skill => skill.category === categoryFilter))
    : [];

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
          <CardTitle>Adicionar/Editar Habilidade</CardTitle>
          <CardDescription>
            {editingId ? "Edite uma habilidade existente" : "Adicione uma nova habilidade ao seu portfólio"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Habilidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Docker, Python, JavaScript" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: DevOps & Cloud, Desenvolvimento & Ferramentas" 
                          {...field} 
                          list="categories"
                        />
                      </FormControl>
                      <datalist id="categories">
                        {categories.map((category) => (
                          <option key={category} value={category} />
                        ))}
                      </datalist>
                      <FormDescription>
                        Digite uma categoria existente ou crie uma nova.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="proficiency"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Nível de Proficiência: {value}%</FormLabel>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={100}
                        step={1}
                        value={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Visibilidade</FormLabel>
                      <FormDescription>
                        Defina se esta habilidade ficará visível no portfólio.
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
                      Atualizar Habilidade
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Habilidade
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
          <div className="flex justify-between items-center">
            <CardTitle>Habilidades Existentes</CardTitle>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardDescription>
            Gerencie suas habilidades existentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredSkills.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma habilidade encontrada nesta categoria.
              </p>
            ) : (
              filteredSkills.map((skill) => (
                <div key={skill.id} className="border rounded-lg p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{skill.name}</h3>
                      {!skill.isVisible && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          Oculto
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleVisibility(skill.id, skill.isVisible)}
                      >
                        {skill.isVisible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(skill)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                              Tem certeza que deseja excluir a habilidade "{skill.name}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(skill.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Categoria: {skill.category}
                  </div>
                  <SkillBar name={skill.name} percentage={skill.proficiency} />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
