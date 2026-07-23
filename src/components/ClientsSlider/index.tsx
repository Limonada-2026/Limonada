// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Marquee from '@/components/Marquee'

export default function ClientsSlider() {

    const logos = [
        {
            src: '/img/clients/99.svg',
            alt: '99'
        },
        {
            src: '/img/clients/banco-do-brasil.svg',
            alt: 'Banco do Brasil'
        },
        {
            src: '/img/clients/braskem.svg',
            alt: 'Braskem'
        },
        {
            src: '/img/clients/ifood.svg',
            alt: 'iFood'
        },
        {
            src: '/img/clients/john-deere.svg',
            alt: 'John Deere'
        },
        {
            src: '/img/clients/kpmg.svg',
            alt: 'KPMG'
        },
        {
            src: '/img/clients/metlife.svg',
            alt: 'MetLife'
        },
        {
            src: '/img/clients/o-boticario.svg',
            alt: 'O Boticário'
        },
        {
            src: '/img/clients/rodobens.svg',
            alt: 'Rodobens'
        },
        {
            src: '/img/clients/sakura.svg',
            alt: 'Sakura'
        },
        {
            src: '/img/clients/sebrae.svg',
            alt: 'Sebrae'
        },
        {
            src: '/img/clients/senior.svg',
            alt: 'Senior'
        }
    ]
    
    return (
        <section className='section-space'>

            <div className='base-container'>
                
                <p>
                    <AnimatedText text='Método testado e aprovado por grandes empresas:' />
                </p>

                {/*
                <h2 className='text-2xl md:text-3xl xl:text-4xl font-bold'>
                    <AnimatedText text='Método testado e aprovado por grandes empresas:' />
                </h2>
                */}

            </div>

            <div className='relative overflow-hidden flex flex-col gap-10 sm:gap-15 md:gap-20 xl:gap-30 mt-14 md:mt-20 lg:mt-25 xl:mt-30'>
                <Marquee logos={logos} />
            </div>

        </section>
    )
}