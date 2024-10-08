import { PagePath } from '@/app/config/nav'
import { ButtonArrow } from '../button-arrow'
import { links } from '../constants'

export default function Landing() {
	return (
		<div className="h-screen w-screen bg-[url('/slide4.png')] bg-cover bg-center pt-[22px] px-[80px]">
			<div className='flex gap-8'>
				{links.map(i => (
					<p key={i} className='text-base font-semibold'>
						{i}
					</p>
				))}
			</div>
			<div className='flex flex-col mt-[126px]'>
				<h1 className='text-[#161822] text-[40px] leading-[44px] font-semibold pb-6'>
					Utilizing Tokenized Assets
				</h1>
				<p className='text-[#161822] text-xl leading-[30px] font-medium pb-8 w-[607px]'>
					Once assets are tokenized into ERC-1155 tokens on the Evidentia
					Protocol, they can be leveraged in various DeFi scenarios, including:
				</p>
				<div className='flex flex-col gap-4 pb-20'>
					{[
						'Collateral in lending protocols',
						'Swapping for other tokens',
						'Security collateral for escrow settlements',
						'Splitting of assets into principal and interest components',
						'Hedging against currency risk',
					].map(i => (
						<div key={i} className='flex items-center gap-4'>
							<div className='size-6 bg-[#37406A]' />
							<p className='text-[#161822] text-xl leading-[30px] font-bold'>
								{i}
							</p>
						</div>
					))}
				</div>
				<div className='flex items-center gap-12'>
					<p className='text-[#161822] text-xl leading-[30px] font-medium max-w-[776px]'>
						Unlock the potential of your assets with{' '}
						<span className='font-bold'>Evidentia Protocol</span>, where trust
						meets innovation in asset tokenization.
					</p>
					<ButtonArrow href={PagePath.Landing5} />
				</div>
			</div>
		</div>
	)
}
