import { PagePath } from '@/app/config/nav'
import { ButtonArrow } from '../button-arrow'
import { links } from '../constants'
import Image from 'next/image'

export default function Landing() {
	return (
		<div className='h-screen w-screen bg-[#F2F5FF] pt-[22px] px-[80px]'>
			<div className='flex gap-8'>
				{links.map(i => (
					<p key={i} className='text-base font-semibold text-[#161822]'>
						{i}
					</p>
				))}
			</div>
			<div className='grid grid-cols-2 mt-[205px] gap-[125px]'>
				<div className='flex flex-col gap-[50px]'>
					<h1 className='text-[40px] leading-[44px] font-medium text-[#161822]'>
						Introducing <span className='font-bold'>Evidentia</span> Protocol
					</h1>
					<p className='text-xl text-[#161822]'>
						Evidentia Protocol enables the seamless tokenization of your assets
						through a trusted and secure platform. Our protocol leverages
						a federation of validated and trusted validators to ensure the
						integrity and authenticity of each issued token.
						<br />
						These tokens serve as undeniable evidence of assets pledged in favor
						of a validator. Once off-chain collateral arrangements are complete,
						assets can be minted into tokens on our platform. Upon token
						burning, validators release the encumbrances on the collateralized
						assets.
					</p>
					<div className='self-end'>
						<ButtonArrow href={PagePath.Landing3} />
					</div>
				</div>
				<div>
					<Image
						src='/slide2.png'
						alt='slide'
						width={476}
						height={242}
						className='mt-[100px]'
					/>
				</div>
			</div>
		</div>
	)
}
