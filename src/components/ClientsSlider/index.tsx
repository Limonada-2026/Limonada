// components
import AnimatedText from '@/components/Utils/Animations/AnimatedText'
import Marquee from '@/components/Marquee'

export default function ClientsSlider() {

    const logos = [
        {
            src: '/img/clients/kpmg.svg',
            alt: 'KPMG'
        },
        {
            src: '/img/clients/rodobens.svg',
            alt: 'Rodobens'
        },
        {
            src: '/img/clients/grupo-boticario.svg',
            alt: 'Grupo Boticário'
        },
        {
            src: '/img/clients/99.svg',
            alt: '99'
        },
        {
            src: '/img/clients/john-deere.svg',
            alt: 'John Deere'
        },
        {
            src: '/img/clients/semantix.svg',
            alt: 'Semantix'
        },
        {
            src: '/img/clients/sicredi.svg',
            alt: 'Sicredi'
        },
        {
            src: '/img/clients/stone.svg',
            alt: 'Stone'
        },
        {
            src: '/img/clients/sakura.svg',
            alt: 'Sakura'
        },
        {
            src: '/img/clients/renner.svg',
            alt: 'Renner'
        },
        {
            src: '/img/clients/neoenergia.svg',
            alt: 'Neoenergia'
        },
        {
            src: '/img/clients/e-core.svg',
            alt: 'E-Core'
        },
        {
            src: '/img/clients/oxford.svg',
            alt: 'Oxford'
        },
        {
            src: '/img/clients/ritmi.svg',
            alt: 'Ritmi'
        },
        {
            src: '/img/clients/rede-dor.svg',
            alt: 'Rede D’Or'
        },
        {
            src: '/img/clients/riachuelo.svg',
            alt: 'Riachuelo'
        }
    ]
    
    return (
        <section className='section-space'>

            <div className='base-container'>
                
                <p className='lg:text-lg'>
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