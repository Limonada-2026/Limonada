'use client'

// libraries
import { useRef } from 'react'
import { Link } from 'next-transition-router'
import { usePathname } from 'next/navigation'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'
import LemonFall from '@/components/Utils/Animations/LemonFall'
import Logo from '@/components/Svg/Logo'
import { Form, Input, InputHidden, Submit } from '@/components/Form'
import AnimatedLogo from '@/components/AnimatedLogo'

// utils
import { pages, social } from '@/utils/routes'
import { getYear } from '@/utils/functions'
import { scrollViewportToTop } from '@/utils/scroll'


export default function Footer() {

	const sectionRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	const year = getYear(new Date().getFullYear().toString())

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		if (href.startsWith('http')) {
			return
		}

		const hrefPath = href.split('#')[0]
		const currentPath = pathname.split('#')[0]

		if (hrefPath === currentPath) {
			e.preventDefault()
			scrollViewportToTop()
		}
	}

	return (
		<div
			className='bg-green-dark rounded-tl-2xl rounded-tr-2xl sm:rounded-tl-4xl sm:rounded-tr-4xl md:rounded-tl-[3rem] md:rounded-tr-[3rem] -mt-4 sm:-mt-8 md:mt-0 relative z-10 text-green-light'
			data-main-footer
			ref={sectionRef}
		>
			<LemonFall
				count={6}
				className='relative w-full pointer-events-auto'
				ceiling={false}
			>
				<div className='base-container'>
					<div className='flex flex-col justify-between sm:gap-20 pb-10 sm:pb-4 md:pb-10 pt-10 xs:pt-14 sm:pt-20'>

						<div className='row'>
							
							<div className='col-md-4'>

								<ul className='flex flex-col gap-2 xs:gap-x-8 xs:flex-row md:flex-col flex-wrap'>
									{[
										{
											label: 'Início',
											href: pages.home
										},
										{
											label: 'Quem Somos',
											href: pages.quem_somos
										},
										{
											label: 'Método Limão',
											href: pages.metodo_limao
										},
										{
											label: 'Ponto de Vista',
											href: pages.ponto_de_vista
										},
										{
											label: 'Contato',
											href: pages.contato
										}
									].map((item, i) => (
										<li key={i}>
											<Link
												href={item.href}
												className='hover-underline md:text-lg'
												onClick={(e) => handleLinkClick(e, item.href)}
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className='col-md-4 my-6 sm:my-10 md:my-0'>
								<ul className='flex flex-col gap-2 xs:gap-x-8 xs:flex-row md:flex-col flex-wrap'>
									{[
										{
											label: 'Instagram',
											href: social.instagram
										},
										{
											label: 'Linkedin',
											href: social.linkedin
										},
										{
											label: 'Youtube',
											href: social.youtube
										}
									].map((item, i) => (
										<li key={i}>
											<a
												href={item.href}
												target='_blank'
												rel='noopener noreferrer'
												className='hover-underline md:text-lg'
												onClick={(e) => handleLinkClick(e, item.href)}
											>
												{item.label}
											</a>
										</li>
									))}
								</ul>
							</div>

							<div className='col-md-4'>

								<p className='md:text-lg'>
									Inscreva-se para receber conteúdos autorais, relevantes e estratégicos sobre desenvolvimento de líderes, equipes e negócios.
								</p>

								<Form
									className='mt-6 mb-4 sm:mb-6'
									endpoint='/api/subscribe'
									onSuccess={{
										title: 'Inscrito com sucesso',
										text: 'Obrigado por se inscrever. Entraremos em contato o mais breve possível.'
									}}
									onError={{
										title: 'Ocorreu um erro ao se inscrever',
										text: 'Por favor, tente novamente mais tarde.'
									}}
								>

									<InputHidden
										name='newsletter'
										value='true'
										id='newsletter_form'
									/>

									<Input
										label='Email'
										id='newsletter_email'
										type='email'
										name='email'
										placeholder='nome@email.com.br'
										required
										isLight
									/>

									<MagneticButton className='max-sm:w-full'>
										<Submit
											text='Enviar'
											className='max-sm:w-full! md:-ml-1'
										/>
									</MagneticButton>
									
								</Form>

							</div>

						</div>

						<div className='flex flex-col-reverse sm:flex-col gap-20 sm:gap-4'>

							<MagneticButton className='max-sm:w-full!' strength={10}>
								<AnimatedLogo className='w-full! sm:w-60!' />
							</MagneticButton>

							<div className='flex items-center max-sm:justify-between gap-4 text-green-neon text-xs sm:text-sm'>

								<p>
									© {year} Limonada®
								</p>

								<Link
									href={pages.politica_de_privacidade}
									className='hover-underline'
								>
									Política de Privacidade
								</Link>

							</div>

						</div>

					</div>
				</div>
			</LemonFall>
		</div>
	)
}