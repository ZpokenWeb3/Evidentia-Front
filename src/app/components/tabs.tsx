import Link from 'next/link'
import { cn } from '../lib/utils'
import { PagePath } from '../config/nav'

export interface Tab {
	title: string
	enabled: boolean
	href: PagePath
}

interface TabsProps {
	tabs: Tab[]
	activeTab: PagePath
}

export const Tabs = ({ tabs, activeTab }: TabsProps) => {
	return (
		<div className='flex w-fit items-center gap-0 rounded-lg bg-card'>
			{tabs.map(i => (
				<Link
					href={i.href}
					key={i.href}
					className={cn(
						'py-[6px] px-4 text-left text-base font-semibold text-tab-not-active text-tab-text',
						i.href === activeTab &&
							'text-foreground font-semibold border-[0.5px] border-tab-border rounded-lg'
					)}
				>
					{i.title}
				</Link>
			))}
		</div>
	)
}
