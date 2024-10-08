import Image from 'next/image'
import { links } from '../constants'
import { ButtonArrow } from '../button-arrow'
import { PagePath } from '@/app/config/nav'

export default function Landing() {
	return (
		<div className='h-screen w-screen bg-[#F2F5FF] pt-[22px] px-[48px]'>
			<div className='flex gap-8'>
				{links.map(i => (
					<p key={i} className='text-base font-semibold text-[#161822]'>
						{i}
					</p>
				))}
			</div>
			<div className='flex items-center flex-col'>
				<Image src='/slide5.png' alt='slide5' width={1301} height={736} />
				<div className='flex self-end items-center gap-5'>
					<p className='text-xl font-bold'>LET’S GO</p>
					<ButtonArrow href={PagePath.KYC} />
				</div>
			</div>
		</div>
	)
}
