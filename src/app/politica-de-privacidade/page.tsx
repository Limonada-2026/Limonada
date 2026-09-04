// libraries
import { Metadata } from 'next'

// components
import BannerTop from './BannerTop'

// images
import banner from '@/assets/img/lemons-bg-3.jpg'

// utils
import { pageMetadata } from '@/utils/seo'

// metadata
export const metadata: Metadata = pageMetadata({
	title: 'Política de Privacidade | Limonada',
	description: 'Como a Limonada trata, protege e armazena dados pessoais, em conformidade com a LGPD. Compromisso e transparência no tratamento das informações.',
	path: '/politica-de-privacidade',
	image: banner.src,
	imageWidth: banner.width,
	imageHeight: banner.height
})

export default function Privacy() {
    return (
        <main>

            <BannerTop
                image={banner.src}
                title='Política de Privacidade'
                description='Compromisso e transparência no tratamento das informações'
            />

            <section className='section-space'>
                <div className='base-container'>
                    <div className='rich-text'>

                        <h2>
                            Política de Segurança da Informação e Proteção de Privacidade
                        </h2>

                        <h3>
                            1. Objetivo
                        </h3>

                        <p>
                            A Política de Segurança da Informação e Proteção de Privacidade da Limonada tem como objetivo garantir a integridade, confidencialidade e disponibilidade das informações, bem como assegurar a proteção dos dados pessoais tratados pela empresa, em conformidade com a Lei Geral de Proteção de Dados (Lei n° 13.709/2018 - LGPD) e outras legislações aplicáveis.
                        </p>

                        <h3>
                            2. Âmbito
                        </h3>

                        <p>
                            Esta política se aplica a todos os colaboradores, estagiários, terceiros, fornecedores e parceiros que tenham acesso a informações da Limonada.
                        </p>

                        <h3>
                            3. Princípios
                        </h3>

                        <ul>

                            <li>
                                <b>Confidencialidade:</b> garantir que as informações sejam acessíveis apenas por pessoas autorizadas.
                            </li>

                            <li>
                                <b>Integridade:</b> assegurar que as informações estejam completas e precisas, protegidas contra alterações não autorizadas.
                            </li>

                            <li>
                                <b>Disponibilidade:</b> garantir que as informações estejam disponíveis quando necessário para os processos de negócio.
                            </li>

                            <li>
                                <b>Legalidade:</b> tratar os dados pessoais em conformidade com a legislação vigente.
                            </li>

                            <li>
                                <b>Transparência:</b> manter uma comunicação clara e transparente sobre o tratamento de dados pessoais.
                            </li>

                            <li>
                                <b>Minimização de Dados:</b> garantir que os dados pessoais coletados sejam adequados, relevantes e limitados ao necessário em relação às finalidades para as quais são tratados.
                            </li>

                            <li>
                                <b>Qualidade dos Dados:</b> assegurar que os dados pessoais sejam exatos e, quando necessário, atualizados.
                            </li>

                        </ul>

                        <h3>
                            4. Diretrizes
                        </h3>

                        <p>
                            <b>Classificação da Informação</b><br />
                            As informações devem ser classificadas de acordo com o seu nível de sensibilidade: Confidencial, Interna e Pública.
                        </p>

                        <p>
                            <b>Controle de Acesso</b><br />
                            O acesso às informações deve ser restrito aos colaboradores que necessitam da informação para o desempenho de suas funções. O acesso deve ser controlado por senhas fortes e mecanismos de autenticação.
                        </p>

                        <p>
                            <b>Tratamento de Dados Pessoais</b>
                        </p>

                        <ul className='-mt-7'>

                            <li>
                                <b>Coleta:</b> Os dados pessoais devem ser coletados de forma mínima, necessária e adequada para as finalidades específicas.
                            </li>

                            <li>
                                <b>Uso:</b> Os dados pessoais devem ser utilizados apenas para as finalidades informadas e consentidas pelos titulares.
                            </li>

                            <li>
                                <b>Armazenamento:</b> Os dados pessoais devem ser armazenados de forma segura, protegidos contra acesso, alteração ou divulgação não autorizados.
                            </li>

                            <li>
                                <b>Compartilhamento:</b> O compartilhamento de dados pessoais com terceiros deve ser realizado somente com o consentimento do titular ou conforme permitido por lei.
                            </li>

                            <li>
                                <b>Retenção e Eliminação:</b> Os dados pessoais devem ser mantidos apenas pelo tempo necessário para as finalidades para as quais foram coletados, sendo eliminados ou anonimizados posteriormente.
                            </li>

                            <li>
                                <b>Direitos dos Titulares:</b> Assegurar os direitos dos titulares de dados, conforme disposto na LGPD, incluindo acesso, correção, eliminação e portabilidade dos dados.
                            </li>

                        </ul>

                        <p>
                            <b>Segurança da Informação</b>
                        </p>

                        <ul className='-mt-7'>

                            <li>
                                <b>Backup:</b> Realizar backups regulares das informações críticas e armazená-los de forma segura.
                            </li>

                            <li>
                                <b>Criptografia:</b> Utilizar criptografia para proteger informações sensíveis em trânsito e em repouso.
                            </li>

                            <li>
                                <b>Monitoramento:</b> Implementar mecanismos de monitoramento para detectar e responder a incidentes de segurança.
                            </li>

                            <li>
                                <b>Treinamento:</b> Proporcionar treinamentos regulares aos colaboradores sobre práticas de segurança da informação e proteção de dados pessoais.
                            </li>

                        </ul>

                        <h3>
                            5. Direitos dos Titulares de Dados:
                        </h3>

                        <p>
                            A Limonada assegura aos titulares de dados os seguintes direitos:
                        </p>

                        <ul>

                            <li>
                                <b>Confirmação e Acesso:</b> Confirmar a existência de tratamento e acessar os dados pessoais.
                            </li>

                            <li>
                                <b>Correção:</b> Corrigir dados incompletos, inexatos ou desatualizados.
                            </li>

                            <li>
                                <b>Anonimização, Bloqueio ou Eliminação:</b> Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD.
                            </li>

                            <li>
                                <b>Portabilidade:</b> Solicitar a portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa.
                            </li>

                            <li>
                                <b>Eliminação:</b> Solicitar a eliminação dos dados pessoais tratados com o consentimento do titular.
                            </li>

                            <li>
                                <b>Informação:</b> Obter informações sobre as entidades públicas e privadas com as quais a Limonada compartilhou seus dados.
                            </li>

                            <li>
                                <b>Revogação do Consentimento:</b> Revogar o consentimento, quando o tratamento for baseado no consentimento.
                            </li>

                        </ul>

                        <h3>
                            6. Responsabilidades:
                        </h3>

                        <ul>

                            <li>
                                <b>Colaboradores:</b> Devem cumprir esta política e participar dos treinamentos oferecidos.
                            </li>

                            <li>
                                <b>Encarregada de Proteção de Dados (DPO):</b> A Sra. Marcela Cuenca é responsável por monitorar o cumprimento desta política, orientar os colaboradores e servir como ponto de contato com os titulares de dados e a Autoridade Nacional de Proteção de Dados (ANPD).
                            </li>

                            <li>
                                <b>Gestores:</b> Devem assegurar que os processos sob sua responsabilidade estejam em conformidade com esta política e proporcionar os recursos necessários para sua implementação.
                            </li>

                        </ul>

                        <h3>
                            7. Violação de Segurança:
                        </h3>

                        <p>
                            Qualquer suspeita ou confirmação de violação de segurança da informação ou de dados pessoais deve ser comunicada imediatamente à Encarregada de Proteção de Dados (DPO), que deverá tomar as medidas necessárias para mitigar os danos e notificar a ANPD e os titulares dos dados, conforme exigido pela LGPD.
                        </p>

                        <h3>
                            8. Revisão e Atualização:
                        </h3>

                        <p>
                            Esta política deve ser revisada e, se necessário, atualizada anualmente ou sempre que houver mudanças significativas nos processos de negócio ou na legislação aplicável.
                        </p>

                        <h3>
                            9. Aprovação:
                        </h3>

                        <p>
                            Esta política entra em vigor a partir da data de aprovação e é parte integrante de nossa missão de excelência em todas as áreas de nossa atuação.
                        </p>

                        <p>
                            Documento Criado em 13/07/2026<br />
                            Revisado Anualmente | Última Revisão em 13/07/2026
                        </p>

                    </div>
                </div>
            </section>

        </main>
    )
}