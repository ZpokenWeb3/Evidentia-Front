'use client'

import { LayoutDashboard } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { Connect } from './connect'

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

export const Header = () => {
	const pathname = usePathname() as PagePath

	const label = useMemo(() => {
		const v = navLinks.find(link => link.href === pathname)

		return v ? v.label : 'Dashboard'
	}, [pathname])

	return (
		<header className='flex min-h-[60px] items-center justify-between bg-header pl-4 pr-[30px]'>
			<h2 className='text-left text-2xl font-semibold leading-7'>{label}</h2>
			<Connect />
		</header>
	)
}
