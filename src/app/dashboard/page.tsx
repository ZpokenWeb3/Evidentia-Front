import { AllBonds } from './all-bonds'
import { bondTabs, dashboardTabs } from './constants'
import { BondsData } from './bonds-data'
import { TabWrapper } from './shared/tab-wrapper'
import { buttonVariants } from '../components/ui/button'
import { PagePath } from '../config/nav'
import Link from 'next/link'
import { cn } from '../lib/utils'

export default function Dashboard() {
	return (
		<div className='flex min-h-full flex-col gap-3 pb-6'>
			<div className='flex grow flex-col rounded bg-background-secondary pb-7 pt-6 shadow-[0px_4px_4px_0px_#00000040]'>
				<TabWrapper
					activeTab={PagePath.Dashboard}
					tabs={dashboardTabs}
					className='border-b-[0.5px] border-border/40 px-6 pb-[18px]'
				/>
				<div className='flex flex-col px-6 pb-5 pt-6'>
					<BondsData />
					<p className='pb-3 pt-10 text-lg font-bold leading-7'>Bonds</p>
					<div className='flex items-center justify-between pb-3'>
						<TabWrapper activeTab={PagePath.Dashboard} tabs={bondTabs} />
						<Link
							href={PagePath.SelectBond}
							className={cn(
								buttonVariants({ variant: 'secondary' }),
								'w-[136px]'
							)}
						>
							Add Bond
						</Link>
					</div>
				</div>
				<AllBonds />
			</div>
		</div>
	)
}
