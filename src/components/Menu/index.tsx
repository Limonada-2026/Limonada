'use client'

// libraries
import { Link } from 'next-transition-router'
import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedLogo from '@/components/AnimatedLogo'

// svg
import { ChevronDown, Hamburger } from '@/components/Svg/Icons'

// utils
import { pages } from '@/utils/routes'

export default function Menu() {

	const pathname = usePathname()

	const headerRef = useRef<HTMLHeadingElement>(null)
	const topMenuRef = useRef<HTMLDivElement>(null)
	const menuAnimRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const menu = topMenuRef.current
		const menuAnim = menuAnimRef.current
		const viewport = document.getElementById('viewport')
		const footer = document.querySelector('[data-main-footer]')

		if (!menu || !menuAnim || !viewport || !footer) return

		gsap.killTweensOf(menuAnim)
		gsap.set(menuAnim, { yPercent: 0 })

		const pinTopMenu = ScrollTrigger.create({
			trigger: menu,
			pin: true,
			start: 'top top',
			endTrigger: footer,
			end: () => `top top+=${menu.offsetHeight}`,
			scroller: viewport,
			anticipatePin: 1,
			pinSpacing: false
		})

		let lastScrollY = 0
		let scrollUpDistance = 0
		let isHidden = false

		const showMenu = () => {
			if (!isHidden) return
			isHidden = false
			scrollUpDistance = 0
			gsap.to(menuAnim, {
				yPercent: 0,
				duration: 0.6,
				ease: 'power1.out',
				overwrite: true
			})
		}

		const hideMenu = () => {
			if (isHidden) return
			isHidden = true
			scrollUpDistance = 0
			gsap.to(menuAnim, {
				yPercent: -110,
				duration: 0.5,
				ease: 'power1.in',
				overwrite: true
			})
		}

		const onScroll = () => {
			const scrollY = viewport.scrollTop
			const delta = scrollY - lastScrollY

			if (Math.abs(delta) < 3) return

			if (scrollY <= 100) {
				showMenu()
				lastScrollY = scrollY
				return
			}

			const nearPinEnd = pinTopMenu.isActive && pinTopMenu.progress > 0.85

			if (delta > 0) {
				scrollUpDistance = 0
				if (pinTopMenu.isActive) hideMenu()
			} else if (delta < 0 && !nearPinEnd) {
				scrollUpDistance += Math.abs(delta)
				if (scrollUpDistance >= 50) {
					showMenu()
				}
			}

			lastScrollY = scrollY
		}

		viewport.addEventListener('scroll', onScroll, { passive: true })

		return () => {
			viewport.removeEventListener('scroll', onScroll)
		}
	}, {
		dependencies: [pathname],
		revertOnUpdate: true
	})

	return (
		<header ref={headerRef}>

			<section className='z-10' ref={topMenuRef}>
				<div ref={menuAnimRef}>
					<div className='bg-green-dark rounded-bottom-corners'>
						<div className='base-container'>
							<div className='flex max-xl:justify-between xl:grid xl:grid-cols-3 items-center py-6 pointer-events-auto'>

								<div className='hidden xl:flex items-center gap-[3vw]'>
									{[
										{
											label: 'Quem somos',
											href: pages.quem_somos
										},
										{
											label: 'Método Limão',
											href: pages.metodo_limao
										},
										{
											label: 'Clientes',
											href: pages.clientes
										}
									].map((item, i) => (
										<Link
											key={i}
											href={item.href}
											className='text-white hover-underline whitespace-nowrap'
										>
											{item.label}
										</Link>
									))}
								</div>

								<AnimatedLogo />

								<button
									className='flex xl:hidden items-center gap-2 text-white cursor-pointer transition-colors duration-200 hover:text-yellow'
									type='button'
								>
									<span>Menu</span>
									<Hamburger className='w-5 h-5 stroke-1.5' />
								</button>

								<div className='hidden xl:flex items-center justify-end gap-[3vw]'>
									{[
										{
											label: 'O que resolvemos',
											subItems: [
												{
													label: 'Liderança',
													href: pages.oque_resolvemos.lideranca
												},
												{
													label: 'Soft skills',
													href: pages.oque_resolvemos.soft_skills
												},
												{
													label: 'Inovação',
													href: pages.oque_resolvemos.inovacao
												},
												{
													label: 'Estratégia',
													href: pages.oque_resolvemos.estrategia
												}
											]
										},
										{
											label: 'Ponto de vista',
											href: pages.ponto_de_vista
										},
										{
											label: 'Contato',
											href: pages.contato
										}
									].map((item, i) => (
										item.subItems ? (
											<div
												key={i}
												className='relative group'
											>

												<p className='text-white hover-underline flex! items-center gap-2 whitespace-nowrap cursor-pointer group-hover:bg-size-[100%_.05em]'>
													{item.label}
													<ChevronDown className='w-4 h-4' />
												</p>

												<div className='absolute top-full left-1/2 -translate-x-1/2 w-full bg-green-dark flex flex-col gap-2 items-center py-4 px-6 rounded-bl-2xl rounded-br-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400'>
													{item.subItems.map((subItem, i2) => (
														<Link
															key={i2}
															href={subItem.href}
															className='text-white hover-underline whitespace-nowrap'
														>
															{subItem.label}
														</Link>
													))}
												</div>

											</div>
										) : (
											<Link
												key={i}
												href={item.href}
												className='text-white hover-underline whitespace-nowrap'
											>
												{item.label}
											</Link>
										)
									))}
								</div>

							</div>
						</div>
					</div>
				</div>
			</section>

		</header>
	)
}