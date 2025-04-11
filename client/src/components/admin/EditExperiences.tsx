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
import { 
  Loader2, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Check, 
  X,
  MoveUp,
  MoveDown,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  useExperiences, 
  useCreateExperience, 
  useUpdateExperience, 
  useDeleteExperience 
} from "@/hooks/usePortfolioContent";
import { Switch } from "@/components/ui/switch";
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

const experienceFormSchema = z.object({
  position: z.string().min(2, {
    message: "O cargo deve ter pelo menos 2 caracteres.",
  }),
  company: z.string().min(2, {
    message: "A empresa deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  startDate: z.string().min(4, {
    message: "A data de início deve ter pelo menos 4 caracteres.",
  }),
  endDate: z.string().optional(),
  isVisible: z.boolean().default(true),
  order: z.number().int().positive()
});

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export function EditExperiences() {
  const { data: experiences, isLoading } = useExperiences();
  const createExperience = useCreateExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      position: "",
      company: "",
      description: "",
      startDate: "",
      endDate: "",
      isVisible: true,
      order: 1
    },
  });

  const resetForm = () => {
    // Calculate next order number
    const nextOrder = experiences && experiences.length > 0
      ? Math.min(...experiences.map(exp => exp.order)) - 1
      : 1;
      
    form.reset({
      position: "",
      company: "",
      description: "",
      startDate: "",
      endDate: "",
      isVisible: true,
      order: nextOrder < 1 ? 1 : nextOrder
    });
    setEditingId(null);
  };

  const handleEdit = (experience: any) => {
    form.reset({
      position: experience.position,
      company: experience.company,
      description: experience.description,
      startDate: experience.startDate,
      endDate: experience.endDate || "",
      isVisible: experience.isVisible,
      order: experience.order
    });
    setEditingId(experience.id);
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleToggleVisibility = async (id: number, currentVisibility: boolean) => {
    try {
      await updateExperience.mutateAsync({
        id,
        data: { isVisible: !currentVisibility }
      });
      toast({
        title: "Experiência atualizada",
        description: `Experiência ${currentVisibility ? "ocultada" : "exibida"} com sucesso.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a visibilidade da experiência.",
        variant: "destructive",
      });
    }
  };

  const handleMoveUp = async (id: number, currentOrder: number) => {
    // Find experience with higher order (lower number)
    const targetExp = experiences?.find(exp => exp.order < currentOrder);
    
    if (!targetExp) {
      toast({
        description: "Esta experiência já está no topo da lista.",
      });
      return;
    }
    
    try {
      // Swap orders
      await updateExperience.mutateAsync({
        id,
        data: { order: targetExp.order }
      });
      
      await updateExperience.mutateAsync({
        id: targetExp.id,
        data: { order: currentOrder }
      });
      
      toast({
        description: "Ordem atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ordem.",
        variant: "destructive",
      });
    }
  };

  const handleMoveDown = async (id: number, currentOrder: number) => {
    // Find experience with lower order (higher number)
    const targetExp = experiences?.find(exp => exp.order > currentOrder);
    
    if (!targetExp) {
      toast({
        description: "Esta experiência já está no final da lista.",
      });
      return;
    }
    
    try {
      // Swap orders
      await updateExperience.mutateAsync({
        id,
        data: { order: targetExp.order }
      });
      
      await updateExperience.mutateAsync({
        id: targetExp.id,
        data: { order: currentOrder }
      });
      
      toast({
        description: "Ordem atualizada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a ordem.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExperience.mutateAsync(id);
      toast({
        title: "Experiência excluída",
        description: "A experiência foi excluída com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível excluir a experiência.",
        variant: "destructive",
      });
    }
  };

  async function onSubmit(values: ExperienceFormValues) {
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateExperience.mutateAsync({ id: editingId, data: values });
        toast({
          title: "Experiência atualizada",
          description: "A experiência foi atualizada com sucesso.",
        });
      } else {
        await createExperience.mutateAsync(values);
        toast({
          title: "Experiência adicionada",
          description: "A experiência foi adicionada com sucesso.",
        });
      }
      resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar a experiência.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Sort experiences by order
  const sortedExperiences = experiences 
    ? [...experiences].sort((a, b) => a.order - b.order) 
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
          <CardTitle>Adicionar/Editar Experiência</CardTitle>
          <CardDescription>
            {editingId ? "Edite uma experiência existente" : "Adicione uma nova experiência profissional"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: DevOps Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Acme Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva suas responsabilidades e conquistas" 
                        rows={4}
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
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Início</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2020" {...field} />
                      </FormControl>
                      <FormDescription>
                        Pode ser o ano ou mês/ano (ex: Jan/2020)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Término</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 2022 (deixe em branco se for atual)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Deixe em branco se for seu emprego atual
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ordem</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormDescription>
                        Número menor aparece primeiro (mais recente)
                      </FormDescription>
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
                          Mostrar esta experiência no portfólio
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
                      Atualizar Experiência
                    </>
                  ) : (
                    <>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Adicionar Experiência
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
          <CardTitle>Experiências Existentes</CardTitle>
          <CardDescription>
            Gerencie suas experiências profissionais. Arraste para reordenar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedExperiences.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma experiência cadastrada.
              </p>
            ) : (
              sortedExperiences.map((experience) => (
                <div key={experience.id} className="border rounded-lg p-4 relative">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        #{experience.order}
                      </span>
                      <h3 className="font-medium">{experience.position}</h3>
                      {!experience.isVisible && (
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          Oculto
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveUp(experience.id, experience.order)}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleMoveDown(experience.id, experience.order)}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleVisibility(experience.id, experience.isVisible)}
                      >
                        {experience.isVisible ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleEdit(experience)}
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
                              Tem certeza que deseja excluir a experiência em "{experience.company}"? Esta ação não pode ser desfeita.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(experience.id)}>
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {experience.company} | {experience.startDate}{experience.endDate ? ` - ${experience.endDate}` : " - Presente"}
                  </div>
                  <p className="text-sm">{experience.description}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
