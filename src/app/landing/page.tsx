import { links } from './constants'
import { ButtonArrow } from './button-arrow'
import { PagePath } from '../config/nav'

export default function Landing() {
	return (
		<div className="h-screen w-screen bg-[url('/slide1.webp')] bg-cover bg-center pt-[22px] px-[80px]">
			<div className='flex gap-8'>
				{links.map(i => (
					<p key={i} className='text-base font-semibold text-[#161822]'>
						{i}
					</p>
				))}
			</div>
			<div className='flex flex-col mt-[278px] gap-20'>
				<h1 className='text-[74px] leading-[74px] font-medium text-[#161822]'>
					Evidentia <span className='font-normal'>Protocol</span>
				</h1>
				<div className='flex flex-col gap-6 ml-[380px]'>
					<div className='w-[311px] text-xl font-xl text-[#161822]'>
						Evidentia Protocol enables the seamless tokenization of your assets
						through a trusted and secure platform.
					</div>
					<ButtonArrow href={PagePath.Landing2} />
				</div>
			</div>
		</div>
	)
}
