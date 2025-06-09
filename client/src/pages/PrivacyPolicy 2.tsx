import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="container mx-auto px-6 py-20 min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader className="text-center border-b pb-4">
              <CardTitle className="text-2xl">Política de Privacidade</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Data da Última Atualização: 19 de Abril de 2025
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="prose prose-sm sm:prose max-w-none">
                <ol className="list-decimal pl-6 space-y-6">
                  <li>
                    <strong>Introdução:</strong> O proprietário deste portfólio online, disponível em https://techdevops.replit.app/,
                    leva a sua privacidade a sério. Esta Política de Privacidade descreve como as informações podem
                    ser coletadas e utilizadas quando você acessa e utiliza o Portfólio.
                  </li>

                  <li>
                    <strong>Informações que Podemos Coletar:</strong> Como este Portfólio é principalmente uma página estática
                    de apresentação, a coleta direta de dados pessoais do usuário é limitada. No entanto, podemos
                    coletar certas informações de forma indireta através de cookies e serviços de terceiros, conforme
                    detalhado abaixo:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        <strong>Cookies de Análise (Google Analytics):</strong> Este Portfólio utiliza o Google Analytics, um
                        serviço de análise da web fornecido pelo Google. O Google Analytics utiliza cookies para
                        coletar informações anônimas sobre como os visitantes usam o site, como o número de
                        visitantes, as páginas visitadas e a origem do tráfego. Esses cookies ajudam a entender e
                        melhorar o desempenho do Portfólio. As informações geradas pelo cookie sobre o seu
                        uso do Portfólio são geralmente transmitidas e armazenadas em servidores do Google
                        nos Estados Unidos.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Como Usamos Suas Informações:</strong> As informações coletadas através do Google Analytics são
                    utilizadas para:
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>Analisar o tráfego e o uso do Portfólio.</li>
                      <li>Compreender o comportamento dos visitantes para melhorar o conteúdo e a estrutura do Portfólio.</li>
                      <li>Gerar relatórios estatísticos sobre a atividade do site.</li>
                    </ul>
                    <p className="mt-2">
                      <strong>Importante:</strong> O proprietário deste Portfólio não utiliza as informações coletadas pelo Google
                      Analytics para identificar indivíduos pessoalmente. Os dados são agregados e anonimizados.
                    </p>
                  </li>

                  <li>
                    <strong>Compartilhamento de Suas Informações:</strong> As informações coletadas pelo Google Analytics são
                    compartilhadas com o Google, conforme descrito em sua própria Política de Privacidade. O
                    proprietário deste Portfólio não compartilha suas informações com outros terceiros, a menos que
                    exigido por lei.
                  </li>

                  <li>
                    <strong>Seus Direitos e Controle de Cookies:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                      <li>
                        Você pode controlar e gerenciar o uso de cookies através das configurações do seu
                        navegador. A maioria dos navegadores permite bloquear ou excluir cookies. No entanto,
                        isso pode afetar a funcionalidade de outros sites que você visita.
                      </li>
                      <li>
                        Para desativar o rastreamento do Google Analytics em todos os sites, você pode instalar
                        um add-on de desativação fornecido pelo Google com informações no link:
                        <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">
                          https://tools.google.com/dlpage/gaoptout
                        </a>.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <strong>Segurança das Informações:</strong> Embora a coleta direta de dados pessoais seja mínima, o
                    proprietário se esforça para garantir a segurança das informações indiretamente coletadas
                    através de práticas de segurança razoáveis. No entanto, é importante lembrar que nenhuma
                    transmissão de dados pela internet é completamente segura.
                  </li>

                  <li>
                    <strong>Links para Outros Sites:</strong> Este Portfólio pode conter links para outros sites. O proprietário não é
                    responsável pelas práticas de privacidade desses outros sites. Recomendamos que você revise as
                    políticas de privacidade de todos os sites que visitar.
                  </li>

                  <li>
                    <strong>Alterações nesta Política de Privacidade:</strong> O proprietário reserva o direito de modificar esta
                    Política de Privacidade a qualquer momento, sem aviso prévio. As alterações entrarão em vigor
                    imediatamente após a sua publicação no Portfólio. Recomenda-se que você revise
                    periodicamente esta página para se manter informado sobre as práticas de privacidade.
                  </li>

                  <li>
                    <strong>Contato:</strong> Para quaisquer dúvidas ou questões relacionadas a esta Política de Privacidade, entre
                    em contato através do e-mail: <a href="mailto:berlanda.medeiros@gmail.com" className="text-primary">berlanda.medeiros@gmail.com</a>.
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}