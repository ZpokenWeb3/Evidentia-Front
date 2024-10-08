import { ChartCandlestick, FileMinus2, ReceiptText } from 'lucide-react'
import { Tab } from '../components/tabs'

import { OverviewCard } from './types'
import { PagePath } from '../config/nav'
import { TableHeader } from '../components/data-table'

export const dashboardTabs: Tab[] = [
	{ title: 'Bonds', href: PagePath.Dashboard, enabled: true },
	{ title: 'Loans', href: PagePath.Loans, enabled: true },
	{ title: 'Staking', href: PagePath.Staking, enabled: false },
]

export const bondTabs: Tab[] = [
	{ title: 'All', href: PagePath.Dashboard, enabled: true },
	{ title: 'Minted', href: PagePath.Minted, enabled: true },
]

export const bondOverviews: OverviewCard[] = [
	{
		title: 'Number of Bonds',
		key: 'bonds',
		icon: <FileMinus2 className='size-5 stroke-2 text-icon' />,
	},
	{
		title: 'Total Value of Tokenized Bonds',
		key: 'rwa',
		icon: <ChartCandlestick className='size-5 stroke-2 text-icon' />,
	},
	{
		title: 'Total value of Bonds in collateral',
		key: 'collateral',
		icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
	},
]

export const allBondHeader: TableHeader[] = [
	{
		key: 'ISIN',
		value: 'ISIN',
	},
	{ key: 'country', value: 'Country' },
	{
		key: 'APY',
		value: 'Bond APY',
	},
	{
		key: 'expirationTimestamp',
		value: 'Maturity date',
	},
	{
		key: 'status',
		value: 'Status',
	},
	{
		key: 'action',
		value: '',
	},
]
