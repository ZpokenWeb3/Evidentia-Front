import { PagePath } from '@/app/config/nav'
import { Tab, Tabs } from '../../components/tabs'
import { cn } from '../../lib/utils'

interface TabWrapperProps {
	activeTab: PagePath
	tabs: Tab[]
	className?: string
}

export const TabWrapper = ({ activeTab, tabs, className }: TabWrapperProps) => {
	return (
		<div className={cn(className)}>
			<Tabs tabs={tabs} activeTab={activeTab} />
		</div>
	)
}
