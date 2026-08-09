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
        logo: '/img/clients/john-deere.svg'
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
        logo: '/img/clients/neoenergia.svg'
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
        logo: '/img/clients/o-boticario.svg'
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
        logo: '/img/clients/rodobens.svg'
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
        logo: '/img/clients/stone.svg'
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
        logo: '/img/clients/sicredi.svg'
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
        logo: '/img/clients/oxford.svg'
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
        logo: '/img/clients/semantix.svg'
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
        logo: '/img/clients/rodobens.svg'
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
        logo: '/img/clients/sakura.svg'
    }
]

export function getCase(slug: string) {
    return cases.find((item) => item.slug === slug)
}
