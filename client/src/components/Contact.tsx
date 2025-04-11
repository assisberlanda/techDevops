import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { 
  Mail, 
  Linkedin, 
  Github, 
  MapPin, 
  Plane, 
  Award, 
  FileText, 
  Loader2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContactContent, useSubmitContactForm } from "@/hooks/usePortfolioContent";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  subject: z.string().min(5, { message: "O assunto deve ter pelo menos 5 caracteres" }),
  message: z.string().min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const { data: contactContent, isLoading } = useContactContent();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const submitContactForm = useSubmitContactForm();
  
  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContactForm.mutateAsync(data);
      setFormSubmitted(true);
      form.reset();
      toast({
        title: "Mensagem enviada",
        description: "Obrigado por entrar em contato! Retornarei em breve.",
        variant: "success"
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };
  
  if (isLoading) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </section>
    );
  }
  
  if (!contactContent) {
    return (
      <section id="contact" className="py-20 bg-muted/30 flex justify-center items-center min-h-[400px]">
        <p>Failed to load contact information</p>
      </section>
    );
  }
  
  const content = contactContent.content;
  
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <SectionHeading number="05" title={content.title} />
        
        <motion.p 
          className="text-lg text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {content.description}
        </motion.p>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assunto</FormLabel>
                      <FormControl>
                        <Input placeholder="Assunto da mensagem" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Sua mensagem..." 
                          rows={5} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={submitContactForm.isPending}
                >
                  {submitContactForm.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Enviar Mensagem"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a 
                        href={`mailto:${content.email}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {content.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">LinkedIn</h4>
                      <a 
                        href={content.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary transition-colors"
                      >
                        linkedin.com/in/assismedeiros
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">GitHub</h4>
                      <a 
                        href={content.github} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-primary transition-colors"
                      >
                        github.com/assisberlanda
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/20 p-3 rounded-full text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Localização</h4>
                      <p>{content.location}</p>
                      <p className="text-sm text-muted-foreground mt-1">{content.relocate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t">
                  <h4 className="font-medium mb-4">Links Rápidos</h4>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="#" 
                      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download CV
                    </a>
                    <a 
                      href={content.dioProfile} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center px-4 py-2 bg-primary/10 hover:bg-primary/20 text-foreground rounded-md transition-colors"
                    >
                      <Award className="mr-2 h-4 w-4" />
                      Perfil DIO
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
