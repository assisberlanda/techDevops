import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";

export default function TermsOfUse() {
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
              <CardTitle className="text-2xl">Termos de Uso</CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Data da Última Atualização: 19 de Abril de 2025
              </p>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="prose prose-sm sm:prose max-w-none">
                <ol className="list-decimal pl-6 space-y-6">
                  <li>
                    <strong>Aceitação dos Termos:</strong> Ao acessar e utilizar o portfólio online disponível em
                    https://techdevops.replit.app/ (o "Portfólio"), você ("Usuário") concorda integralmente com estes
                    Termos de Uso. Caso não concorde com qualquer parte destes termos, não utilize o Portfólio.
                  </li>

                  <li>
                    <strong>Uso do Portfólio:</strong> Este Portfólio tem como objetivo apresentar minhas habilidades, experiência
                    profissional e projetos na área de Tecnologia e DevOps. O conteúdo aqui apresentado é
                    meramente informativo e para fins de apresentação profissional. O uso deste Portfólio não
                    estabelece qualquer relação contratual entre o Usuário e o proprietário, a menos que
                    expressamente acordado por escrito em um documento separado.
                  </li>

                  <li>
                    <strong>Propriedade Intelectual:</strong> Todo o conteúdo presente neste Portfólio, incluindo textos, imagens,
                    layouts, código-fonte e outros elementos, é de propriedade intelectual exclusiva do proprietário,
                    a menos que explicitamente indicado de outra forma. É proibida a reprodução, distribuição,
                    modificação ou qualquer outra forma de utilização não autorizada do conteúdo sem a permissão
                    prévia e por escrito do proprietário.
                  </li>

                  <li>
                    <strong>Conduta do Usuário:</strong> O Usuário concorda em utilizar o Portfólio de maneira ética e responsável,
                    respeitando todos os direitos de propriedade intelectual do proprietário. É proibido qualquer uso
                    do Portfólio para fins ilegais, difamatórios ou que possam causar danos a terceiros.
                  </li>

                  <li>
                    <strong>Limitação de Responsabilidade:</strong> O conteúdo deste Portfólio é fornecido "como está" e sem
                    garantias de qualquer tipo, expressas ou implícitas. O proprietário não se responsabiliza por
                    quaisquer imprecisões, erros ou omissões no conteúdo, nem por quaisquer danos diretos,
                    indiretos, incidentais, consequências ou especiais decorrentes do acesso ou uso deste Portfólio.
                    O proprietário também não se responsabiliza por links externos que possam estar presentes no
                    Portfólio, sendo o acesso a esses links de total responsabilidade do Usuário.
                  </li>

                  <li>
                    <strong>Alterações nos Termos de Uso:</strong> O proprietário reserva o direito de modificar estes Termos de
                    Uso a qualquer momento, sem aviso prévio. As alterações entrarão em vigor imediatamente após
                    a sua publicação no Portfólio. Recomenda-se que o Usuário revise periodicamente esta página
                    para se manter informado sobre as condições de uso.
                  </li>

                  <li>
                    <strong>Lei Aplicável e Foro:</strong> Estes Termos de Uso serão regidos e interpretados de acordo com as leis
                    do Brasil. Quaisquer disputas decorrentes destes Termos de Uso serão submetidas à jurisdição
                    exclusiva dos tribunais do Brasil.
                  </li>

                  <li>
                    <strong>Contato:</strong> Para quaisquer dúvidas ou questões relacionadas a estes Termos de Uso, entre em
                    contato através do e-mail: <a href="mailto:berlanda.medeiros@gmail.com" className="text-primary">berlanda.medeiros@gmail.com</a>.
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