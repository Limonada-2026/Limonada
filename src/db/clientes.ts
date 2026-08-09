export type CaseBlock = {
    title: string
    text: string
}

export type CaseNumber = {
    number: number
    text: string
    hasPlus?: boolean
    decimals?: number
    suffix?: string
}

export type CaseTestimonial = {
    testimonial: string
    position: string
    company: string
}

export type Case = {
    id: number
    slug: string
    client: string
    title: string
    subtitle: string
    seoTitle: string
    description: string
    tema: string
    formato: string
    image: string
    logo: string
    // internal page content
    limao: string[]
    corte: string[]
    espremendo: string[]
    blocks: CaseBlock[]
    numbers: CaseNumber[]
    testimonials: CaseTestimonial[]
    cta: string
}

export const cases: Case[] = [
    {
        id: 1,
        slug: 'limonada-com-john-deere',
        client: 'John Deere',
        title: 'John Deere: uma nova perspectiva para um programa consolidado',
        subtitle: 'Como redesenhamos uma jornada de desenvolvimento para manter a liderança preparada para os desafios de um negócio em constante transformação.',
        seoTitle: 'Desenvolvimento de liderança com a John Deere | Limonada',
        description: 'Como a John Deere desenvolveu 60 líderes em três países com uma jornada desenhada pela Limonada.',
        tema: 'Liderança',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/john-deere.jpg',
        logo: '/img/clients/john-deere.svg',
        limao: [
            'O eLAP, programa de desenvolvimento de lideranças da John Deere, faz parte da história da companhia há uma década. Mas o negócio mudou, os mercados mudaram, e o programa precisava de uma nova perspectiva para continuar relevante.',
            'A complexidade real apareceu rápido: lideranças no Brasil, na Argentina e no México, com a mesma base cultural da empresa, mas enfrentando desafios locais diferentes.',
            'O desafio da Limonada era construir uma jornada capaz de conectar desenvolvimento individual, estratégia de negócio e transformação organizacional. Assim, o desenvolvimento das lideranças acontecia sempre ligado aos desafios reais da operação.'
        ],
        corte: [
            'Antes de propor qualquer mudança, ouvimos. Conversamos com RH, patrocinadores do programa e lideranças de diferentes áreas para entender o que tinha funcionado ao longo dos anos e o que já não gerava o mesmo impacto.',
            'Dessas conversas nasceu um mapa de competências sobre três pilares: pensamento crítico, visão sistêmica e influência estratégica. Cada um explorado nas dimensões de indivíduo, negócio e mercado.'
        ],
        espremendo: [
            'Combinamos assessment individual, network para ampliar repertório, treinamento com curadoria de conteúdo respeitando o contexto de cada país, e projeto real para gerar movimento dentro da operação.',
            'Os três países rodaram a trilha em paralelo, com o mesmo mapa de competências adaptado à realidade local de cada um.'
        ],
        blocks: [
            { title: 'Assessment', text: 'Entendimento completo do indivíduo' },
            { title: 'Network', text: 'Conexão que amplia repertório' },
            { title: 'Treinamento', text: 'Curadoria de conteúdo que respeita o contexto' },
            { title: 'Projeto', text: 'Aprendizagem prática que gera movimento' }
        ],
        numbers: [
            { number: 60, text: 'participantes' },
            { number: 3, text: 'países: Brasil, Argentina e México' },
            { number: 100, hasPlus: true, text: 'horas de treinamento + mentoria' },
            { number: 14, text: 'projetos desenvolvidos com desafios reais do negócio' }
        ],
        testimonials: [
            {
                testimonial: 'Transformadora. Tive a oportunidade de conhecer e entender outras áreas muito distantes da minha, mas fundamentais para o negócio que deveriam estar muito próximas.',
                position: 'Colaborador',
                company: 'John Deere'
            },
            {
                testimonial: 'Uma jornada de transformação, desde conteúdos para suportar o desenvolvimento pessoal quanto liderança e conexão com temas estratégicos da companhia.',
                position: 'Colaborador',
                company: 'John Deere'
            }
        ],
        cta: 'Seu desafio é desenvolver líderes para um cenário que muda o tempo todo?'
    },
    {
        id: 2,
        slug: 'limonada-com-neoenergia',
        client: 'Neoenergia',
        title: 'Neoenergia: formando líderes para conduzir projetos estratégicos',
        subtitle: 'Como conectamos lideranças de alto potencial a desafios reais da companhia, dentro de um programa de aceleração de carreira.',
        seoTitle: 'Desenvolvimento de liderança e gestão de projetos | Neoenergia',
        description: 'Como a Neoenergia formou 27 líderes em gestão de projetos estratégicos, conectados a desafios reais do negócio.',
        tema: 'Liderança',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/neoenergia.jpg',
        logo: '/img/clients/neoenergia.svg',
        limao: [
            'O Volts é o programa de aceleração de lideranças da Neoenergia. Dentro dele, a Limonada assumiu a frente de Gestão de Projetos, conectando participantes a desafios estratégicos da companhia.',
            'Os participantes já ocupavam posições de liderança, conheciam profundamente o negócio e tinham alto potencial de desenvolvimento. O desafio era preparar essas lideranças para utilizar a gestão de projetos como uma competência estratégica, capaz de conectar execução, colaboração e geração de valor para o negócio.'
        ],
        corte: [
            'Antes de falar sobre metodologia, começamos entendendo o problema.',
            'Conduzimos entrevistas individuais com os sponsors de cada iniciativa para compreender objetivos, contexto, nível de complexidade e expectativas de resultado.',
            'A partir desse diagnóstico, foram estruturados cinco desafios estratégicos voltados à eficiência, inovação e desburocratização do negócio.',
            'Refinamos o escopo de cada desafio, equilibramos sua complexidade e garantimos que todos os grupos tivessem espaço para investigar problemas, explorar alternativas e construir recomendações capazes de influenciar decisões da companhia.'
        ],
        espremendo: [
            'A partir do diagnóstico, estruturamos uma jornada que conectava desenvolvimento de liderança à aplicação prática em desafios estratégicos da Neoenergia.'
        ],
        blocks: [
            { title: 'Skills', text: 'Base de habilidades para liderança inovadora, colaboração e comunicação assertiva' },
            { title: 'Prática', text: 'Gestão de projetos aplicado às cinco iniciativas estratégicas do negócio' },
            { title: 'Mentoria', text: 'Acompanhamento em grupo com foco nos desafios de cada frente como gestores de projetos' },
            { title: 'Influência', text: 'Storytelling e comunicação executiva para o pitch final à liderança' }
        ],
        numbers: [
            { number: 27, text: 'participantes' },
            { number: 36, text: 'horas de treinamento' },
            { number: 5, text: 'projetos de inovação apresentados e implementados no negócio' },
            { number: 9.74, decimals: 2, text: 'nota média de avaliação do programa' }
        ],
        testimonials: [
            {
                testimonial: 'Conteúdo bem rico a respeito de gestão de projeto. Conseguimos nos preparar para os escopos que virão já nos familiarizando com os temas.',
                position: 'Líder',
                company: 'Neoenergia'
            },
            {
                testimonial: 'A parceria da Limonada foi muito importante ao longo da jornada de gestão de projetos para fazer os participantes saírem da zona de conforto, se desafiarem e alcançarem resultado de sucesso.',
                position: 'Líder',
                company: 'Neoenergia'
            }
        ],
        cta: 'Seu desafio também é desenvolver líderes enquanto transforma o negócio?'
    },
    {
        id: 3,
        slug: 'limonada-com-boticario',
        client: 'Grupo Boticário',
        title: 'Programa de Trainee Grupo Boticário: preparando os futuros especialistas e líderes da organização',
        subtitle: 'Uma jornada que conecta desenvolvimento, desafios reais e estratégia de negócio para acelerar a evolução dos talentos do Grupo Boticário.',
        seoTitle: 'Programa de Trainee Grupo Boticário | Limonada',
        description: 'Como a Limonada desenhou a trilha do Programa de Trainee do Grupo Boticário para formar especialistas de referência e futuros líderes em cinco competências universais.',
        tema: 'Soft Skills',
        formato: 'Programa de Trainee',
        image: '/img/clients/featured/boticario.jpg',
        logo: '/img/clients/o-boticario.svg',
        limao: [
            'O programa de trainees do Grupo Boticário já tinha história, talentos fortes e reconhecimento no mercado. O objetivo ia além: acelerar o desenvolvimento dos participantes para se tornarem especialistas de referência e futuros líderes da companhia.',
            'Habilidades individuais e estratégia do negócio precisavam estar fortemente conectadas.',
            'O desafio da Limonada era construir uma trilha que fizesse as duas coisas ao mesmo tempo: desenvolver competências e gerar impacto nas áreas de atuação dos trainees.'
        ],
        corte: [
            'Antes de desenhar a jornada, mergulhamos no que o Grupo Boticário esperava dos seus futuros especialistas e líderes. Conversamos com o time de Desenvolvimento de Talentos e com lideranças de diferentes áreas para transformar expectativas, desafios e percepções em comportamentos concretos.',
            'Foram definidas cinco competências universais: Influência Multifuncional, Adaptabilidade, Foco em Execução, Resolução de Problemas e Visão Holística de Negócio e Alavancas de Valor.',
            'Para cada uma delas, traduzimos os comportamentos esperados e os objetivos de negócio que a trilha deveria desenvolver, garantindo que cada encontro contribuísse para gerar impacto real nas áreas em que os trainees atuariam.'
        ],
        espremendo: [
            'Com as competências definidas e traduzidas em objetivos de aprendizagem, a trilha foi estruturada em três fases, Foco no Indivíduo, Foco no Negócio e Foco no Mercado, para que o desenvolvimento acontecesse de forma progressiva e sempre conectado à realidade do Grupo Boticário.',
            'Cada etapa da jornada foi desenhada para conectar aprendizagem e aplicação imediata nos desafios vividos pelos trainees.',
            'Além dos encontros de desenvolvimento, acompanhamos continuamente os projetos conduzidos pelos trainees em suas áreas para ampliar o impacto das entregas.'
        ],
        blocks: [
            { title: 'Assessment', text: 'Mapeamento de maturidade individual nas cinco competências' },
            { title: 'Treinamento', text: 'Encontros com especialistas e owner do projeto' },
            { title: 'Mentoria', text: 'Mentorias coletivas para sustentar a aplicação prática' },
            { title: 'Projeto', text: 'Projetos reais acompanhados junto aos trainees' }
        ],
        numbers: [
            { number: 10, text: 'trainees em formação' },
            { number: 5, text: 'competências universais' },
            { number: 18, text: 'encontros de treinamento' },
            { number: 8, text: 'mentorias coletivas' },
            { number: 52, text: 'horas de treinamento' }
        ],
        testimonials: [
            {
                testimonial: 'Me sinto mais preparada para lidar com conversas difíceis e situações de conflito. As metodologias mostradas me trouxeram clareza para agir e gerar mudanças nas minhas relações profissionais.',
                position: 'Trainee',
                company: 'Grupo Boticário'
            },
            {
                testimonial: 'O treinamento reverberou de uma forma muito positiva em mim e no meu momento de vida e carreira.',
                position: 'Trainee',
                company: 'Grupo Boticário'
            },
            {
                testimonial: 'A Limonada tem um equilíbrio ótimo entre a teoria e a experiência real. A teoria é importante, mas sozinha pode ser vaga e não engaja. A experiência é importante, mas sozinha não cria modelos mentais para replicar. Já tive experiências anteriores com ambos os cenários, por isso digo que esse é o grande diferencial da Limonada pra mim.',
                position: 'Profissional Programas Corporativos',
                company: 'Grupo Boticário'
            }
        ],
        cta: 'Seu desafio é formar as próximas referências e lideranças da sua empresa?'
    },
    {
        id: 4,
        slug: 'limonada-com-rodobens',
        client: 'Rodobens',
        title: 'Programa de Trainee Rodobens: desenvolvendo mentalidade de inovação na prática',
        subtitle: 'Como transformamos um desafio estratégico da Rodobens no ponto de partida para desenvolver inovação na prática.',
        seoTitle: 'Innovation Makers: trainees e starts Rodobens resolvendo desafios reais | Limonada',
        description: 'Como a Limonada conectou trainees e starts da Rodobens a um desafio que já estava na mesa da liderança, unindo inovação à solução de negócio.',
        tema: 'Inovação',
        formato: 'Programa de Trainee',
        image: '/img/clients/featured/rodobens-1.jpg',
        logo: '/img/clients/rodobens.svg',
        limao: [
            'O programa nasceu para desenvolver trainees e starts da Rodobens para um contexto em que inovar significa muito mais do que gerar ideias: significa compreender problemas complexos, colaborar entre diferentes áreas e construir soluções capazes de gerar valor para o negócio.',
            'O desafio era ampliar o repertório e fortalecer o mindset desses profissionais desde o início da carreira, preparando-os para atuar de forma mais estratégica, colaborativa e orientada à experimentação.',
            'Para isso, era preciso criar uma experiência em que a aprendizagem acontecesse sobre um desafio real da companhia, permitindo que cada conceito fosse imediatamente colocado em prática.'
        ],
        corte: [
            'Antes de desenhar a jornada, buscamos um desafio capaz de provocar exatamente os comportamentos que queríamos desenvolver nos participantes.',
            'Conversamos com lideranças de inovação e de diferentes áreas da Rodobens, analisamos o mapa estratégico da companhia e identificamos uma iniciativa prioritária que reunia o nível certo de complexidade, colaboração e potencial de impacto.',
            'A partir desse desafio, desenhamos toda a jornada. Cada ferramenta, workshop e mentoria foi pensado para ajudar trainees e starts a desenvolver uma mentalidade mais investigativa, experimental e orientada à geração de valor para o negócio.'
        ],
        espremendo: [
            'Com o desafio definido, estruturamos uma jornada de seis meses que combinou diagnóstico, desenvolvimento e experimentação. Cada etapa preparava os participantes para compreender o problema, construir soluções e validá-las junto às lideranças responsáveis.'
        ],
        blocks: [
            { title: 'Treinamento', text: 'Encontros com especialistas combinando conceitos de inovação a ferramentas de Problem Thinking e Design Thinking para desenvolvimento de soluções para testagem' },
            { title: 'Mentoria', text: 'Mentorias para sustentar o desenvolvimento do projeto ao longo da trilha' },
            { title: 'Projeto', text: 'Desafio real do negócio desenvolvido em grupo, com protótipo testado e apresentado a uma banca avaliadora para alta liderança da organização' },
            { title: 'Resultado', text: 'O ciclo fechou onde começou: na mesa do líder que trouxe o problema, agora com recomendações concretas construídas pelos próprios trainees e starts.' }
        ],
        numbers: [
            { number: 9, text: 'trainees da área de inovação da Rodobens e starts' },
            { number: 7, text: 'meses de trilha' },
            { number: 51, text: 'horas de treinamento' },
            { number: 1, text: 'desafio real do mapa estratégico da Rodobens' },
            { number: 2, text: 'iniciativas desenvolvidas para implementação no negócio' },
            { number: 9.9, decimals: 1, text: 'avaliação média da jornada' }
        ],
        testimonials: [
            {
                testimonial: 'Cada encontro é um novo aprendizado. Tem sido muito enriquecedor e contribuído para meu crescimento principalmente profissional.',
                position: 'Participante do Innovation Makers',
                company: 'Rodobens'
            },
            {
                testimonial: 'Muito bom para pensar em quais movimentos estão acontecendo na empresa e como se preparar para as mudanças que são constantes no dia a dia.',
                position: 'Participante do Innovation Makers',
                company: 'Rodobens'
            },
            {
                testimonial: 'O que mais se destacou positivamente foi o alto nível de engajamento e participação dos Trainees e Starts ao longo da trilha, mesmo sendo uma experiência online, o que sabemos que pode ser bastante desafiador. A forma como os conteúdos foram apresentados, aliada à condução dinâmica e interativa dos facilitadores, criou um ambiente acolhedor e motivador, que estimulou a troca entre os participantes e manteve o interesse ativo durante os treinamentos.',
                position: 'Thais Genova, Desenvolvimento Organizacional',
                company: 'Rodobens'
            }
        ],
        cta: 'Seu desafio é desenvolver mentalidade inovadora em times e líderes?'
    },
    {
        id: 5,
        slug: 'limonada-com-stone',
        client: 'Stone',
        title: 'Stone: fortalecendo lideranças para crescer junto com o negócio',
        subtitle: 'Como desenvolvemos uma jornada para apoiar líderes na construção de relações mais fortes, comunicação mais efetiva e equipes mais autônomas.',
        seoTitle: 'Desenvolvimento de liderança na Stone | Limonada',
        description: 'Como a Stone desenvolveu seus líderes em uma jornada contínua focada em comunicação, conexão e liderança autêntica.',
        tema: 'Liderança',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/stone.jpg',
        logo: '/img/clients/stone.svg',
        limao: [
            'A Stone vive um contexto de crescimento acelerado e desenvolvimento constante de novas lideranças.',
            'Nesse cenário, liderar exige muito mais do que acompanhar resultados. É preciso criar relações de confiança, desenvolver pessoas e manter equipes engajadas mesmo diante de mudanças, diferentes formatos de trabalho e alta velocidade de execução.',
            'O desafio era apoiar líderes em diferentes áreas da empresa a fortalecer competências essenciais para uma liderança mais consciente, humana e preparada para gerar impacto no negócio.'
        ],
        corte: [
            'Para desenhar a jornada, buscamos compreender o contexto da liderança dentro da Stone.',
            'Construímos o programa em parceria com a equipe de Educação Corporativa, validando cada conteúdo e conectando os encontros aos desafios reais vividos pelas lideranças. Casos do dia a dia passaram a orientar as discussões, tornando o aprendizado imediatamente aplicável à rotina dos participantes.',
            'A partir desse diagnóstico, desenhamos uma jornada que equilibrava desenvolvimento individual, troca entre pares e aplicação prática, respeitando o momento de maturidade dessas lideranças e os desafios da organização.'
        ],
        espremendo: [
            'A jornada foi construída para que cada conceito pudesse ser imediatamente aplicado na rotina das lideranças.'
        ],
        blocks: [
            { title: 'Conexão', text: 'Desenvolvimento da escuta, presença e construção de relações de confiança' },
            { title: 'Comunicação', text: 'Ferramentas para conversas difíceis, feedbacks, influência e comunicação assertiva' },
            { title: 'Prática', text: 'Peer coaching, estudos de caso e situações reais trazidas pelos próprios líderes durante os encontros' },
            { title: 'Transferência', text: 'Materiais preparatórios, conteúdos complementares e atividades práticas entre as aulas para fortalecer a aplicação do aprendizado' }
        ],
        numbers: [
            { number: 250, text: 'participantes' },
            { number: 48, text: 'horas de treinamento' },
            { number: 100, suffix: '%', text: 'recomendariam o programa' }
        ],
        testimonials: [
            {
                testimonial: 'Conteúdo muito bom. Ajudou a dar clareza sobre como evoluir e trouxe ferramentas para apoiar essa evolução. As trocas também foram muito importantes para compartilhar boas práticas e desafios.',
                position: 'Líder',
                company: 'Stone'
            },
            {
                testimonial: 'Treinamento muito importante. Me fez refletir sobre como estou atuando hoje e abriu minha cabeça para muitas oportunidades de evolução.',
                position: 'Líder',
                company: 'Stone'
            }
        ],
        cta: 'Seu desafio é formar as próximas referências e lideranças da sua empresa?'
    },
    {
        id: 6,
        slug: 'limonada-com-sicredi',
        client: 'Sicredi',
        title: 'Sicredi: desenvolvendo líderes para fortalecer a cultura cooperativista',
        subtitle: 'Há dois anos, conduzimos uma jornada contínua de desenvolvimento para formar lideranças mais preparadas para gerir pessoas, impulsionar resultados e fortalecer a cultura cooperativista.',
        seoTitle: 'Desenvolvimento de Lideranças no Sicredi | Limonada',
        description: 'Há dois anos, a Limonada desenvolve líderes do Sicredi por meio de uma jornada contínua que fortalece gestão, inovação, inteligência emocional e performance.',
        tema: 'Liderança',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/sicredi.jpg',
        logo: '/img/clients/sicredi.svg',
        limao: [
            'O Centro de Serviços Compartilhados do Sicredi reúne profissionais altamente especializados, responsáveis por sustentar operações críticas que impactam centenas de agências e milhares de colaboradores.',
            'Nesse contexto, excelência técnica é indispensável. Mas liderar exige mais do que conhecimento sobre processos, compliance e indicadores. É preciso desenvolver a capacidade de influenciar, dar feedback, conduzir conversas difíceis, criar segurança psicológica e transformar conhecimento em performance.',
            'O desafio da Limonada era construir uma jornada de desenvolvimento capaz de fortalecer essas competências ao longo do tempo, preparando líderes e futuros líderes para apoiar pessoas com a mesma excelência com que sustentam o negócio.'
        ],
        corte: [
            'O diagnóstico inicial revelou um time que conhecia profundamente o negócio e construía relações de confiança com facilidade, mas que precisava evoluir em competências de gestão, desenvolvimento de pessoas e geração de performance. Esse entendimento orientou toda a arquitetura da jornada e definiu as prioridades de desenvolvimento.',
            'Cada etapa prepara a próxima: primeiro fortalecemos os fundamentos da liderança, depois ampliamos repertório para inovação, desenvolvemos inteligência emocional para lidar com a pressão e, por fim, aprofundamos ferramentas para gestão e desenvolvimento de equipes.',
            'Ao longo de dois anos, ampliamos o programa de duas para seis turmas, consolidando uma trilha contínua que conecta liderança, inovação, inteligência emocional e gestão da performance.'
        ],
        espremendo: [
            'A trilha rodou em módulos sequenciais, cada um construindo sobre o anterior.'
        ],
        blocks: [
            { title: 'Gestão', text: 'Ferramentas para transformar conhecimento técnico em capacidade de desenvolver pessoas' },
            { title: 'Influência', text: 'Práticas de comunicação, feedback e conversas difíceis para fortalecer relações de confiança' },
            { title: 'Inovação', text: 'Mentalidade de experimentação e visão sistêmica para identificar oportunidades de melhoria' },
            { title: 'Performance', text: 'Rituais, indicadores e desenvolvimento contínuo para gerar resultados sustentáveis' }
        ],
        numbers: [
            { number: 2, text: 'anos de parceria' }
        ],
        testimonials: [],
        cta: 'Seu desafio é desenvolver liderança em um time técnico, sem perder o olhar humano?'
    },
    {
        id: 7,
        slug: 'limonada-com-oxford',
        client: 'Oxford',
        title: 'Oxford: estratégia, cultura e liderança para construir o futuro do negócio',
        subtitle: 'Como conectamos estratégia, cultura, liderança e inovação em uma jornada única de transformação organizacional.',
        seoTitle: 'Transformação organizacional com a Oxford | Limonada',
        description: 'Como a Limonada apoiou a Oxford na construção da estratégia, cultura e desenvolvimento da liderança para construir sua visão de futuro.',
        tema: 'Estratégia',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/oxford.jpg',
        logo: '/img/clients/oxford.svg',
        limao: [
            'A Oxford é uma marca com décadas de história como fabricante de louças, e vinha ampliando sua ambição para se tornar referência em soluções completas para o lar na América Latina. Esse movimento exigia decisões cada vez mais orientadas à estratégia, num mercado em aceleração competitiva.',
            'O desafio da Limonada foi construir uma jornada integrada que apoiasse a liderança a definir os caminhos da empresa até 2030, fortalecer sua cultura organizacional e desenvolver as competências necessárias para transformar estratégia em execução.'
        ],
        corte: [
            'Entendemos que essa transformação não caberia em uma única frente de trabalho. Por isso, desenhamos um programa integrado em quatro eixos complementares, conectando estratégia, cultura, inovação e governança em uma jornada só, em vez de tratar cada uma dessas frentes como uma entrega separada.',
            'Cada eixo foi conduzido para reforçar os demais: a visão estratégica orientando as escolhas de cultura, a cultura sustentando a capacidade de inovar, e a governança garantindo que tudo isso se traduzisse em rotina de negócio.'
        ],
        espremendo: [
            'Combinamos planejamento estratégico, desenvolvimento da liderança, inovação aplicada e governança para criar uma transformação consistente ao longo da jornada.'
        ],
        blocks: [
            { title: 'Strategy Maker', text: 'Construção colaborativa da visão Oxford 2030 e definição dos caminhos estratégicos do negócio' },
            { title: 'Culture Strategy', text: 'Fortalecimento da cultura organizacional e desenvolvimento de lideranças capazes de transformar valores em atitudes' },
            { title: 'Innovation Makers', text: 'Jornada prática que conecta estratégia, transformação digital e habilidades de execução, transformando oportunidades identificadas em projetos reais de negócio' },
            { title: 'Comitê S&OP', text: 'Estrutura de governança que fortalece o planejamento integrado entre áreas, sustentando previsibilidade e decisão estratégica ao longo do tempo' }
        ],
        numbers: [
            { number: 66, text: 'participantes' },
            { number: 160, text: 'horas de treinamento' },
            { number: 36, text: 'horas de Comitê S&OP' },
            { number: 20, text: 'horas de mentoria' },
            { number: 5, text: 'projetos desenvolvidos' }
        ],
        testimonials: [
            {
                testimonial: 'Está sendo muito bom a empresa trazer um treinamento voltado à cultura organizacional, discutir a influência que tem o comportamento do líder no clima da equipe e da organização.',
                position: 'Colaborador',
                company: 'Oxford'
            },
            {
                testimonial: 'Dia de elevado grau de reflexão, avaliação das nossas dores e iniciar um planejamento de novas ações, com a visão do hoje e dos caminhos que tomaremos para o futuro da Oxford.',
                position: 'Colaborador',
                company: 'Oxford'
            }
        ],
        cta: 'Seu desafio é desenvolver líderes para um cenário que muda o tempo todo?'
    },
    {
        id: 8,
        slug: 'limonada-com-semantix',
        client: 'Semantix',
        title: 'Semantix: preparando talentos para inovar desde o primeiro desafio',
        subtitle: 'Como desenvolvemos uma jornada para acelerar a formação de estagiários, conectando desenvolvimento humano, tecnologia e desafios reais do negócio.',
        seoTitle: 'Programa de estágio na Semantix | Limonada',
        description: 'Como a Limonada construiu uma jornada de soft e hard skills para formar a nova geração de talentos da Semantix.',
        tema: 'Programa de Estágio',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/semantix.jpg',
        logo: '/img/clients/semantix.svg',
        limao: [
            'A Semantix é uma empresa construída sobre dados e inteligência artificial. Esse contexto atrai talentos com alta afinidade tecnológica, mas em diferentes estágios de desenvolvimento das competências humanas necessárias para transformar conhecimento em impacto.',
            'Para quem está iniciando a carreira, dominar a parte técnica não basta. Colaborar, comunicar ideias, pedir e receber feedback e assumir protagonismo passam a ser habilidades tão importantes quanto desenvolver soluções.',
            'O desafio da Limonada era construir uma jornada capaz de desenvolver comportamento, repertório e postura profissional na mesma velocidade em que a empresa desenvolve tecnologia, integrando competências humanas e técnicas em uma única experiência de aprendizagem.'
        ],
        corte: [
            'Acreditamos que grandes talentos se desenvolvem quando conhecimento e prática evoluem juntos.',
            'Por isso, desenhamos uma jornada que conectou desenvolvimento humano, formação técnica e desafios reais de negócio em uma única experiência de aprendizagem.',
            'O ponto de partida foi um assessment comportamental individual, utilizado para ampliar o autoconhecimento e orientar o desenvolvimento individual ao longo do programa. O ponto de chegada foi um desafio real de negócio, no qual equipes multidisciplinares precisavam transformar conhecimento técnico, colaboração e pensamento crítico em soluções aplicáveis para a empresa.',
            'Assim, cada etapa reforçava a seguinte: o autoconhecimento fortalecia as relações, as competências ampliavam a capacidade de atuação e a prática consolidava o aprendizado.'
        ],
        espremendo: [
            'Ao longo da jornada, combinamos desenvolvimento humano, conhecimento técnico e aprendizagem prática para preparar os participantes para os desafios da Semantix.'
        ],
        blocks: [
            { title: 'Assessment', text: 'Autoconhecimento como base para o desenvolvimento ao longo de toda a jornada' },
            { title: 'Soft Skills', text: 'Comunicação, protagonismo, colaboração e inteligência emocional para acelerar o início da carreira' },
            { title: 'Hard Skills', text: 'Ferramentas e metodologias conectadas aos desafios de tecnologia e inteligência artificial' },
            { title: 'Projeto', text: 'Aplicação prática do aprendizado em um desafio real apresentado à liderança da empresa' }
        ],
        numbers: [
            { number: 30, text: 'participantes' },
            { number: 50, text: 'horas de desenvolvimento' },
            { number: 80, text: 'atividades práticas' },
            { number: 9.9, decimals: 1, text: 'de satisfação média' }
        ],
        testimonials: [
            {
                testimonial: 'Muito importante para o autoconhecimento e para compartilhar com os outros estagiários. Dá um sentimento de conexão muito mais real e palpável.',
                position: 'Estagiário',
                company: 'Semantix'
            },
            {
                testimonial: 'O insight que mais me marcou foi lembrar que, apesar de executar a parte técnica muito bem, a IA nunca será capaz de escutar o outro, compreender e se importar com os sentimentos dos seres humanos.',
                position: 'Estagiário',
                company: 'Semantix'
            }
        ],
        cta: 'Seu time também precisa desenvolver comportamento na mesma velocidade que desenvolve tecnologia?'
    },
    {
        id: 9,
        slug: 'limonada-com-rodobens-cx',
        client: 'Rodobens',
        title: 'Rodobens: uma cultura de CX que nasce dentro do próprio negócio',
        subtitle: 'Como formar embaixadores que tornam a experiência do cliente responsabilidade de toda a empresa.',
        seoTitle: 'Academia de Customer Experience na Rodobens | Limonada',
        description: 'Como a Limonada apoiou a Rodobens a formar embaixadores de Customer Experience para fortalecer uma cultura centrada no cliente.',
        tema: 'Customer Experience',
        formato: 'Jornada personalizada',
        image: '/img/clients/featured/rodobens-2.jpg',
        logo: '/img/clients/rodobens.svg',
        limao: [
            'A Rodobens atua com produtos de confiança de longo prazo: consórcio de veículos e imóveis, uma relação que se sustenta em anos, não em uma única venda. Boa parte da jornada do cliente passa por parceiros e representantes, e depende de etapas com prazos legislativos que o cliente não controla.',
            'O ecossistema da empresa reúne diferentes produtos e soluções, mas a experiência ainda era percebida de forma fragmentada. Para mudar esse cenário, era preciso desenvolver pessoas capazes de conectar áreas, reduzir fricções e fortalecer uma cultura genuinamente centrada no cliente.'
        ],
        corte: [
            'Realizamos entrevistas com lideranças, analisamos os desafios estratégicos da companhia e identificamos os principais pontos de fricção na jornada do cliente. O diagnóstico revelou barreiras culturais, estruturas organizadas em silos e oportunidades para fortalecer uma visão integrada da experiência.',
            'A partir desse entendimento, construímos uma jornada personalizada para desenvolver linguagem comum, ampliar repertório e preparar os participantes para atuar como agentes de transformação dentro da organização.'
        ],
        espremendo: [
            'Combinamos diagnóstico, aprendizagem aplicada, discussões sobre desafios reais e construção coletiva para transformar Customer Experience em prática.'
        ],
        blocks: [
            { title: 'Diagnóstico', text: 'Entrevistas e escuta ativa para compreender desafios do negócio e da jornada do cliente' },
            { title: 'Curadoria', text: 'Conteúdo fundamentado em pesquisas, cases e metodologias de Customer Experience' },
            { title: 'Dinâmicas', text: 'Exercícios práticos para analisar a jornada do cliente e identificar oportunidades reais de melhoria' },
            { title: 'Embaixadores', text: 'Desenvolvimento de profissionais preparados para disseminar a cultura de CX em toda a organização' }
        ],
        numbers: [
            { number: 33, text: 'participantes' },
            { number: 21, text: 'horas de formação' },
            { number: 9.5, decimals: 1, text: 'de satisfação' }
        ],
        testimonials: [
            {
                testimonial: 'Foi o melhor treinamento que já participei, saí com novas ideias e com um gatilho de mudança.',
                position: 'Colaborador',
                company: 'Rodobens'
            },
            {
                testimonial: 'Meu primeiro encontro, e estou encantada e apaixonada e engajada para os próximos. Tudo muito claro, muito rico, muito embasado em artigos e dados reais, isso traz credibilidade, além do domínio do educador.',
                position: 'Colaborador',
                company: 'Rodobens'
            }
        ],
        cta: 'Sua empresa também quer transformar Customer Experience em uma cultura vivida por toda a organização?'
    },
    {
        id: 10,
        slug: 'limonada-com-sakura',
        client: 'Sakura',
        title: 'Sakura: construindo a estratégia para a próxima geração da empresa',
        subtitle: 'Como transformamos décadas de referência técnica em um mapa estratégico conectando diagnóstico, visão de futuro e execução.',
        seoTitle: 'Planejamento estratégico com a Sakura | Limonada',
        description: 'Como a Limonada apoiou a Sakura na construção de um planejamento estratégico que conectou mercado, negócio, liderança e execução para os próximos anos.',
        tema: 'Estratégia',
        formato: 'Consultoria estratégica',
        image: '/img/clients/featured/sakura.jpg',
        logo: '/img/clients/sakura.svg',
        limao: [],
        corte: [
            'Antes de propor qualquer direcionamento, mergulhamos na realidade da Sakura. Foram entrevistas com lideranças de diferentes áreas, análise do mercado, diagnóstico organizacional e leitura das capacidades internas da empresa.',
            'Esse processo transformou diferentes percepções sobre marca, pessoas, operação, indústria, finanças e modelo de negócio em uma visão estratégica compartilhada, capaz de orientar prioridades, investimentos e decisões para os próximos anos.'
        ],
        espremendo: [
            'Transformamos diagnóstico em estratégia e estratégia em plano de ação.'
        ],
        blocks: [
            { title: 'Diagnóstico', text: 'Entrevistas, análise SWOT e leitura do ambiente interno e externo para identificar oportunidades, riscos e capacidades do negócio' },
            { title: 'Estratégia', text: 'Construção colaborativa da proposta de valor, mapa estratégico e prioridades para o crescimento da companhia' },
            { title: 'Execução', text: 'Definição de projetos prioritários, OKRs, indicadores e governança para acompanhar a implementação da estratégia' },
            { title: 'Governança', text: 'Estruturação de comitês que sustentam o acompanhamento contínuo das iniciativas e das decisões da liderança' }
        ],
        numbers: [
            { number: 42, text: 'líderes conectados à execução da estratégia' },
            { number: 5, text: 'comitês estratégicos implementados' },
            { number: 9, text: 'projetos estratégicos priorizados' }
        ],
        testimonials: [
            {
                testimonial: 'A Limonada tem sido essencial, principalmente para nos auxiliar a ter as conversas mais difíceis de forma mais independente e menos pessoal, auxiliando a empresa a tomar decisões olhando mais ao mercado e menos às nossas formas mais tradicionais de pensar e agir.',
                position: 'Roberto Otake, CEO & Board Member',
                company: 'Sakura'
            }
        ],
        cta: 'Seu desafio também é transformar estratégia em execução?'
    }
]

export function getCase(slug: string) {
    return cases.find((item) => item.slug === slug)
}
