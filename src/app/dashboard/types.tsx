import { ReactNode } from 'react'
import { PagePath } from '../config/nav'

export type DashboardTab =
	| PagePath.Dashboard
	| PagePath.Loans
	| PagePath.Staking

export interface OverviewCard {
	title: string
	icon: ReactNode
	key: string
}
