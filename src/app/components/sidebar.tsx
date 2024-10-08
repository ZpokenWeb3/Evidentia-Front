'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'
import { navLinks, PagePath } from '../config/nav'

export const Sidebar = () => {
	const pathname = usePathname() as PagePath

	const isActiveLink = (href: PagePath, subPages?: PagePath[]): boolean => {
		let links = [href]
		if (subPages && subPages.length) {
			links = [...links, ...subPages]
		}
		return links.includes(pathname)
	}

	return (
		<aside className='w-[290px] bg-sidebar px-3 pt-5 text-sidebar-foreground'>
			<Link
				href={PagePath.Dashboard}
				className='px-3 text-left text-xl font-semibold'
			>
				EVIDENTIA
			</Link>
			<nav className='mt-[52px] flex flex-col'>
				{navLinks.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className={cn(
							'text-base font-semibold text-left p-3 flex items-center gap-2',
							isActiveLink(link.href, link.subPages) &&
								'bg-sidebar-active rounded-xl border-l border-activeBorder'
						)}
					>
						{link.icon}
						<p> {link.label}</p>
					</Link>
				))}
			</nav>
		</aside>
	)
}
