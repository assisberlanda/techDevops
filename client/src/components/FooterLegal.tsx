import { useState, useEffect } from "react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/use-language";

export function FooterLegal() {
  const { t } = useLanguage();
  const [openTab, setOpenTab] = useState<string | undefined>(undefined);

  const handleAccordionChange = (value: string) => {
    setOpenTab(value === openTab ? undefined : value);
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center space-x-6 mb-6">
        <button 
          onClick={() => handleAccordionChange("terms")}
          className={`text-sm font-medium rounded-md px-4 py-2 transition-all duration-300 ${
            openTab === "terms" 
              ? "dark:bg-primary/20 dark:text-primary dark:border-primary bg-blue-500/20 text-blue-600 border-blue-500 shadow-md" 
              : "dark:hover:bg-primary/10 dark:hover:text-primary hover:bg-blue-500/10 hover:text-blue-600 border border-transparent"
          }`}
        >
          {t("footer.terms")}
        </button>
        <button 
          onClick={() => handleAccordionChange("privacy")}
          className={`text-sm font-medium rounded-md px-4 py-2 transition-all duration-300 ${
            openTab === "privacy" 
              ? "dark:bg-primary/20 dark:text-primary dark:border-primary bg-blue-500/20 text-blue-600 border-blue-500 shadow-md" 
              : "dark:hover:bg-primary/10 dark:hover:text-primary hover:bg-blue-500/10 hover:text-blue-600 border border-transparent"
          }`}
        >
          {t("footer.privacy")}
        </button>
      </div>
      
      <Accordion
        type="single"
        collapsible
        value={openTab}
        onValueChange={handleAccordionChange}
        className="w-full max-w-6xl mx-auto"
      >
        <AccordionItem value="terms" className="border-b-0">
          <AccordionTrigger className="hidden">
            {t("footer.terms")}
          </AccordionTrigger>
          <AccordionContent className="text-base text-left px-4 bg-background/40 rounded-lg shadow-inner">
            <div className="prose dark:prose-invert max-w-none py-6 px-4 lg:px-8">
              <h3 className="text-xl font-semibold text-center mb-4 dark:text-white text-gray-900">Termos de Uso</h3>
              <p className="text-sm text-center dark:text-gray-300 text-gray-600 mb-6">
                Data da Última Atualização: 19 de Abril de 2025
              </p>
              <ol className="list-decimal pl-4 space-y-6 dark:text-gray-200 text-gray-800">
                <li>
                  <strong className="dark:text-white text-blue-600">Aceitação dos Termos:</strong> Ao acessar e utilizar o portfólio online disponível em
                  https://techdevops.replit.app/ (o "Portfólio"), você ("Usuário") concorda integralmente com estes
                  Termos de Uso. Caso não concorde com qualquer parte destes termos, não utilize o Portfólio.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Uso do Portfólio:</strong> Este Portfólio tem como objetivo apresentar minhas habilidades, experiência
                  profissional e projetos na área de Tecnologia e DevOps. O conteúdo aqui apresentado é
                  meramente informativo e para fins de apresentação profissional. O uso deste Portfólio não
                  estabelece qualquer relação contratual entre o Usuário e o proprietário.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Propriedade Intelectual:</strong> Todo o conteúdo presente neste Portfólio, incluindo textos, imagens,
                  layouts, código-fonte e outros elementos, é de propriedade intelectual exclusiva do proprietário,
                  a menos que explicitamente indicado de outra forma.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Conduta do Usuário:</strong> O Usuário concorda em utilizar o Portfólio de maneira ética e responsável,
                  respeitando todos os direitos de propriedade intelectual do proprietário.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Limitação de Responsabilidade:</strong> O conteúdo deste Portfólio é fornecido "como está" e sem
                  garantias de qualquer tipo, expressas ou implícitas.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Alterações nos Termos de Uso:</strong> O proprietário reserva o direito de modificar estes Termos de
                  Uso a qualquer momento, sem aviso prévio.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Lei Aplicável e Foro:</strong> Estes Termos de Uso serão regidos e interpretados de acordo com as leis
                  do Brasil.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Contato:</strong> Para quaisquer dúvidas ou questões relacionadas a estes Termos de Uso, entre em
                  contato através do e-mail: <a href="mailto:berlanda.medeiros@gmail.com" className="dark:text-primary text-blue-600">berlanda.medeiros@gmail.com</a>.
                </li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="privacy" className="border-b-0">
          <AccordionTrigger className="hidden">
            {t("footer.privacy")}
          </AccordionTrigger>
          <AccordionContent className="text-base text-left px-4 bg-background/40 rounded-lg shadow-inner">
            <div className="prose dark:prose-invert max-w-none py-6 px-4 lg:px-8">
              <h3 className="text-xl font-semibold text-center mb-4 dark:text-white text-gray-900">Política de Privacidade</h3>
              <p className="text-sm text-center dark:text-gray-300 text-gray-600 mb-6">
                Data da Última Atualização: 19 de Abril de 2025
              </p>
              <ol className="list-decimal pl-4 space-y-6 dark:text-gray-200 text-gray-800">
                <li>
                  <strong className="dark:text-white text-blue-600">Introdução:</strong> O proprietário deste portfólio online, disponível em https://techdevops.replit.app/,
                  leva a sua privacidade a sério. Esta Política de Privacidade descreve como as informações podem
                  ser coletadas e utilizadas quando você acessa e utiliza o Portfólio.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Informações que Podemos Coletar:</strong> Como este Portfólio é principalmente uma página estática
                  de apresentação, a coleta direta de dados pessoais do usuário é limitada. No entanto, podemos
                  coletar certas informações de forma indireta através de cookies e serviços de terceiros.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Como Usamos Suas Informações:</strong> As informações coletadas através do Google Analytics são
                  utilizadas para analisar o tráfego e o uso do Portfólio, compreender o comportamento dos visitantes 
                  e gerar relatórios estatísticos sobre a atividade do site.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Compartilhamento de Suas Informações:</strong> As informações coletadas pelo Google Analytics são
                  compartilhadas com o Google, conforme descrito em sua própria Política de Privacidade.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Seus Direitos e Controle de Cookies:</strong> Você pode controlar e gerenciar o uso de cookies através 
                  das configurações do seu navegador. Para desativar o rastreamento do Google Analytics, você pode 
                  instalar um add-on de desativação.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Segurança das Informações:</strong> Embora a coleta direta de dados pessoais seja mínima, o
                  proprietário se esforça para garantir a segurança das informações indiretamente coletadas.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Links para Outros Sites:</strong> Este Portfólio pode conter links para outros sites. O proprietário não é
                  responsável pelas práticas de privacidade desses outros sites.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Alterações nesta Política de Privacidade:</strong> O proprietário reserva o direito de modificar esta
                  Política de Privacidade a qualquer momento, sem aviso prévio.
                </li>

                <li>
                  <strong className="dark:text-white text-blue-600">Contato:</strong> Para quaisquer dúvidas ou questões relacionadas a esta Política de Privacidade, entre
                  em contato através do e-mail: <a href="mailto:berlanda.medeiros@gmail.com" className="dark:text-primary text-blue-600">berlanda.medeiros@gmail.com</a>.
                </li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}