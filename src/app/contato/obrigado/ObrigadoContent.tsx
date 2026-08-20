'use client'

// libraries
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

// components
import MagneticButton from '@/components/Utils/Animations/MagneticButton'

// img
import check from '@/assets/img/check.png'

// svg
import UxCheck from '@/assets/svg/ux/check.svg'
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// utils
import { pages } from '@/utils/routes'
import { pushGtmEvent } from '@/utils/gtm'

export default function ObrigadoContent() {
	const router = useRouter()

	// only render once we've confirmed this page was reached from a real form submission
	const [isAllowed, setIsAllowed] = useState(false)

	useEffect(() => {
		const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
		const hasSubmittedForm = sessionStorage.getItem('formSubmitted') === 'true'

		if (hasSubmittedForm || isLocalhost) {
			setIsAllowed(true)

			// only count real submissions as conversions, not localhost test visits
			if (hasSubmittedForm) {
				pushGtmEvent('generate_lead')
			}
		} else {
			router.replace(pages.contato)
		}
	}, [router])

	if (!isAllowed) {
		return null
	}

	return (
		<main className='menu-space'>

			<section className='mt-14 mb-30 md:mt-[6vw] md:mb-[10vw]'>
				<div className='base-container text-center'>

					<Image
						src={check}
						alt='Check'
						width={400}
						height={400}
						className='w-40 md:w-60 h-auto object-contain block mx-auto mb-4'
					/>

					<h1 className='title-96 text-green-medium md:text-center'>
						Mensagem enviada <br />
						com sucesso
					</h1>

					<h2 className='md:text-lg lg:text-xl text-green-medium md:text-center md:max-w-180 md:mx-auto mt-4 md:mt-6'>
						Obrigado pela mensagem. Recebemos o seu desafio e em breve alguém do nosso time vai <strong>entrar em contato</strong> com você.
					</h2>

					<MagneticButton className='mt-6 md:mt-10 inline-block'>
						<Link
							href={pages.home}
							className='button button--green-neon whitespace-nowrap gap-4!'
						>
							Voltar para a Home <UxArrowRight className='w-3 h-3' />
						</Link>
					</MagneticButton>

				</div>
			</section>

		</main>
	)
}
