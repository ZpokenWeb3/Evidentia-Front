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
	SelectBond = '/select-bond',
	Landing = '/landing',
	Landing2 = '/landing/2',
	Landing3 = '/landing/3',
	Landing4 = '/landing/4',
	Landing5 = '/landing/5',
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
