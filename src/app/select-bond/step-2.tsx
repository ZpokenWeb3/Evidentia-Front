import { Check, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/button'

export const Step2 = ({ mint }: { mint: () => Promise<void> }) => {
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		let i = 0
		const interval = setInterval(() => {
			i = i + 1
			if (i > 4) return

			setStep(i)
		}, 2000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className='grid w-full grid-cols-2 p-6'>
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col gap-[76px]'>
					<p className='text-xl font-semibold'>
						Here is a simple collateral agreement to take your bonds as
						collateral and mint a tokenized version of your bonds.
					</p>
					<div className='flex flex-col gap-[60px]'>
						<div className='flex flex-col gap-4'>
							<div className='flex items-center gap-4'>
								{step === 0 ? (
									<div className='rounded-lg bg-status-ready px-[6px] py-[2px]'>
										<RotateCcw className='size-4 stroke-2' />
									</div>
								) : (
									<div className='rounded-lg bg-status-success px-[6px] py-[2px]'>
										<Check className='size-4 stroke-2' />
									</div>
								)}
								<p className='text-base font-semibold'>
									Waiting your signature
								</p>
							</div>
							{step >= 1 && (
								<div className='flex items-center gap-4'>
									{step === 1 ? (
										<div className='rounded-lg bg-status-ready px-[6px] py-[2px]'>
											<RotateCcw className='size-4 stroke-2' />
										</div>
									) : (
										<div className='rounded-lg bg-status-success px-[6px] py-[2px]'>
											<Check className='size-4 stroke-2' />
										</div>
									)}
									<p className='text-base font-semibold'>
										Awaiting verification
									</p>
								</div>
							)}
							{step >= 2 && (
								<div className='flex items-center gap-4'>
									{step === 2 ? (
										<div className='rounded-lg bg-status-ready px-[6px] py-[2px]'>
											<RotateCcw className='size-4 stroke-2' />
										</div>
									) : (
										<div className='rounded-lg bg-status-success px-[6px] py-[2px]'>
											<Check className='size-4 stroke-2' />
										</div>
									)}
									<p className='text-base font-semibold'>
										Signed by both sides
									</p>
								</div>
							)}
						</div>
						{step >= 3 && (
							<p className='text-base font-semibold'>
								Your bonds are ready to mint
							</p>
						)}
					</div>
				</div>
				{step >= 3 && (
					<Button className='w-[136px] self-end' onClick={() => void mint()}>
						Mint
					</Button>
				)}
			</div>
			<div className='flex justify-end'>
				<Image src='/contract.webp' width={524} height={642} alt='Contract' />
			</div>
		</div>
	)
}
