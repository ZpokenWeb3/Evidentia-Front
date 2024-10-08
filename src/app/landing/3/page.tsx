'use client'

import { PagePath } from '@/app/config/nav'
import { ButtonArrow } from '../button-arrow'
import { links } from '../constants'
import { useState } from 'react'

export default function Landing() {
	const [step, setStep] = useState<1 | 2>(1)

	console.log(step)

	return (
		<div className="h-screen w-screen bg-[url('/slide3.png')] bg-cover bg-center pt-[22px] px-[80px]">
			<div className='flex gap-8'>
				{links.map(i => (
					<p key={i} className='text-base font-semibold text-[#161822]'>
						{i}
					</p>
				))}
			</div>
			<div className='flex flex-col gap-10 w-[607px] ml-[548px] mt-[126px]'>
				<div className='flex flex-col gap-4 '>
					<h1 className='text-[40px] leading-[44px] font-semibold mb-2 text-[#161822]'>
						Who Can Tokenize Assets?
					</h1>
					<p className='text-xl font-medium text-[#161822]'>
						Any lawful asset owner can utilize Evidentia Protocol, provided they
						are in a jurisdiction where our validators operate. The off-chain
						nature of collateral agreements means the governing jurisdiction
						of these agreements is crucial. Currently, our services are tailored
						for qualified investors, ensuring compliance and security.
					</p>
					<div className='self-end'>
						<ButtonArrow onClick={() => setStep(2)} />
					</div>
				</div>
				{step === 2 && (
					<div className='flex flex-col gap-4'>
						<h1 className='text-[40px] leading-[44px] font-semibold mb-2 text-[#161822]'>
							What Assets Can Be Tokenized?
						</h1>
						<p className='text-xl font-medium text-[#161822]'>
							Evidentia Protocol is designed with a focus on tokenizing debt
							securities, such as bonds and notes. Our primary activity centers
							around government bonds, recognized as the most reliable
							securities in each market.
						</p>
						<div className='self-end'>
							<ButtonArrow href={PagePath.Landing4} />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
