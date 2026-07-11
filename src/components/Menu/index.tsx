'use client'

// libraries
import clsx from 'clsx'
import { Link } from 'next-transition-router'
import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedLogo from '@/components/AnimatedLogo'
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// svg
import { ChevronDown, Hamburger, Close } from '@/components/Svg/Icons'

// utils
import { pages } from '@/utils/routes'
import { lockViewportScroll, unlockViewportScroll } from '@/utils/scroll'

export default function Menu() {

	const pathname = usePathname()

	const headerRef = useRef<HTMLHeadingElement>(null)
	const topMenuRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const menu = topMenuRef.current
		const viewport = document.getElementById('viewport')
		if (!menu || !viewport) return

		let lastScroll = viewport.scrollTop
		let upwardDistance = 0
		let isHidden = false

		const show = () => {
			if (!isHidden) return
			isHidden = false
			gsap.to(menu, {
				yPercent: 0,
				duration: .75,
				ease: 'power2.out',
				overwrite: true
			})
		}

		const hide = () => {
			if (isHidden) return
			isHidden = true
			gsap.to(menu, {
				yPercent: -110,
				duration: .75,
				ease: 'power2.out',
				overwrite: true
			})
		}

		gsap.set(menu, { yPercent: 0 })

		ScrollTrigger.create({
			trigger: '#main-content',
			scroller: viewport,
			start: 0,
			end: 'max',
			onUpdate: (self) => {
				const scroll = self.scroll()
				const delta = scroll - lastScroll

				if (scroll <= 100) {
					upwardDistance = 0
					show()
				} else if (delta > 0) {
					upwardDistance = 0
					hide()
				} else if (delta < 0) {
					upwardDistance += -delta
					if (upwardDistance >= 30) {
						upwardDistance = 0
						show()
					}
				}

				lastScroll = scroll
			}
		})
	}, {
		dependencies: [pathname],
		revertOnUpdate: true
	})

	const menuTl = useRef<gsap.core.Timeline | null>(null)

	const { contextSafe } = useGSAP(() => {
		gsap.set('[data-layer]', { yPercent: -100 })
		gsap.set('[data-close]', { translateY: -10 })
		gsap.set('[data-item-fs-menu]', { translateY: -100 })

		menuTl.current = gsap.timeline({
			paused: true,
			onReverseComplete: () => unlockViewportScroll()
		})
			.to('[data-layer]', {
				yPercent: 0,
				borderRadius: '0 0 0 0',
				stagger: .2,
				duration: .75,
				ease: 'power2.out'
			})
			.to('[data-open]', {
				translateY: 10,
				opacity: 0,
				duration: .3,
				ease: 'power2.out'
			}, '-=1.2')
			.to('[data-close]', {
				translateY: 0,
				opacity: 1,
				visibility: 'visible',
				duration: .3,
				ease: 'power2.out'
			}, '-=1.1')
			.to('[data-fs-menu]', {
				pointerEvents: 'auto',
				ease: 'power2.out'
			}, '<')
			.to('[data-item-fs-menu]', {
				translateY: 0,
				stagger: .05,
				opacity: 1,
				duration: .3,
				ease: 'power2.out'
			}, '-=.8')

		const onKeyDown = (e: KeyboardEvent) => {
			const tl = menuTl.current
			if (e.key !== 'Escape' || !tl || tl.progress() === 0) return
			tl.reverse()
		}

		window.addEventListener('keydown', onKeyDown)
		return () => {
			window.removeEventListener('keydown', onKeyDown)
			menuTl.current = null
			unlockViewportScroll()
		}
	}, { scope: headerRef })

	const toggleMenu = contextSafe(() => {
		const tl = menuTl.current
		if (!tl) return

		if (tl.progress() === 0 || tl.reversed()) {
			lockViewportScroll()
			tl.play()
		} else {
			tl.reverse()
			setTimeout(() => {
				setIsActive(false)
			}, 400)
		}
	})

	const closeMenu = contextSafe(() => {
		const tl = menuTl.current
		if (!tl || tl.progress() === 0) return
		tl.reverse()
		setTimeout(() => {
			setIsActive(false)
		}, 400)
	})

	const [isActive, setIsActive] = useState(false)

	const toggleSubMenu = () => {
		setIsActive((prev) => !prev)
	}

	return (
		<header ref={headerRef}>

			<section
				className='fixed top-0 left-0 w-full z-10'
				ref={topMenuRef}
			>
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

							<MagneticButton className='xl:mx-auto' strength={10}>
								<AnimatedLogo onClick={closeMenu} />
							</MagneticButton>

							<button
								className='relative flex xl:hidden text-white cursor-pointer transition-colors duration-200 hover:text-yellow'
								type='button'
								onClick={toggleMenu}
							>

								<span
									className='flex items-center gap-2'
									data-open
								>
									<span>Menu</span>
									<Hamburger className='w-5 h-5 stroke-1.5' />
								</span>

								<span
									className='flex items-center gap-1 absolute bottom-0 right-0 opacity-0 invisible'
									data-close
								>
									<span>Fechar</span>
									<Close className='w-6 h-6 stroke-1.5' />
								</span>

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
			</section>

			<aside className='fixed top-0 left-0 w-full h-full pointer-events-none z-9' data-fs-menu>

				<div className='absolute z-0 top-0 left-0 w-full h-full bg-green-neon rounded-bottom-corners' data-layer />
				<div className='absolute z-1 top-0 left-0 w-full h-full bg-black rounded-bottom-corners' data-layer />
				<div className='absolute z-2 top-0 left-0 w-full h-full bg-yellow rounded-bottom-corners' data-layer />
				<div className='absolute z-3 top-0 left-0 w-full h-full bg-green-dark rounded-bottom-corners' data-layer />

				<div className='base-container relative z-4 pt-30 overflow-scroll max-h-svh min-h-svh'>
					<div className='flex flex-col gap-2'>
						{[
							{
								label: 'Início',
								href: pages.home
							},
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
							},
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
									className='relative flex flex-col'
								>

									<button
										className={clsx(
											'title-72 opacity-0 text-white flex items-center gap-2 cursor-pointer max-sm:text-[12vw]! w-fit transition-colors duration-200 hover:text-green-neon hover:translate-x-2',
											isActive && 'text-green-neon!'
										)}
										type='button'
										data-item-fs-menu
										onClick={toggleSubMenu}
									>
										{item.label}
										<ChevronDown className={clsx(
											'w-6 h-6 stroke-3 transition-transform duration-300',
											isActive && 'rotate-180'
										)} />
									</button>

									<div className={clsx(
										'relative overflow-hidden grid grid-rows-[0fr] transition-all duration-300',
										isActive && 'grid-rows-[1fr] overflow-visible'
									)}>
										<div className={clsx(
											'min-h-0 transition-opacity duration-300 invisible opacity-0 overflow-hidden',
											isActive && 'visible opacity-100 overflow-visible'
										)}>
											<div className='flex flex-wrap gap-2 pt-2 md:pt-4 pb-4 md:pb-8'>
												{item.subItems?.map((subItem, i2) => (
													<Link
														key={i2}
														href={subItem.href}
														className='flex bg-green-neon text-sm sm:text-base md:text-lg text-black px-4 md:px-6 py-1 md:py-2 rounded-full'
														onClick={closeMenu}
													>
														{subItem.label}
													</Link>
												))}
											</div>
										</div>
									</div>

								</div>
							) : (
								<Link
									key={i}
									href={item.href}
									className='title-72 opacity-0 text-white max-sm:text-[12vw]! w-fit transition-colors duration-200 hover:text-green-neon hover:translate-x-2'
									onClick={closeMenu}
									data-item-fs-menu
								>
									{item.label}
								</Link>
							)
						))}
					</div>
				</div>

			</aside>

		</header>
	)
}