import { cn } from '@/app/lib/utils'
import { OverviewCard } from '../types'

interface OverviewCardsProps {
	title: string
	content: OverviewCard[]
	contentData: Record<string, string>
	className?: string
}

export const OverviewCards = ({
	title,
	content,
	contentData,
	className,
}: OverviewCardsProps) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-lg font-bold leading-7'>{title}</p>
			<div
				className={cn('grid grid-cols-1 gap-[22px]  md:grid-cols-3', className)}
			>
				{content.map(card => (
					<div
						key={card.key}
						className='flex items-start gap-[10px] rounded-lg bg-card p-4 shadow-[0px_2px_2px_0px_#00000040]'
					>
						<div className='rounded-sm bg-icon-background/15 px-2 py-1'>
							{card.icon}
						</div>
						<div className='flex h-full flex-col justify-between gap-1'>
							<p className='text-base font-semibold'>{card.title}</p>
							<p className='text-2xl font-bold leading-[30px] text-digital-blue'>
								{contentData[card.key]}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
