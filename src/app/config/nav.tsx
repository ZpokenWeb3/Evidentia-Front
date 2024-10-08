import { LayoutDashboard } from 'lucide-react'
import { ReactNode } from 'react'

export type NavLink = {
	label: string
	href: PagePath
	icon: ReactNode
	subPages?: PagePath[]
}

export enum PagePath {
	Dashboard = '/dashboard',
	Minted = '/dashboard/minted',
	Loans = '/dashboard/loans',
	Staking = '/dashboard/staking',
	KYC = '/kyc',
}

export const navLinks: NavLink[] = [
	{
		label: 'Dashboard',
		href: PagePath.Dashboard,
		icon: (
			<LayoutDashboard className='size-5 stroke-2 text-sidebar-foreground' />
		),
		subPages: [PagePath.Minted, PagePath.Loans, PagePath.Staking],
	},
]
