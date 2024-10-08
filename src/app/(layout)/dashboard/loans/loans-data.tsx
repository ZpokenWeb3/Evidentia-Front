'use client'

import { formatUnits } from 'ethers/lib/utils'
import { OverviewCards } from '../shared/overview-cards'
import { loansOverviews } from './constants'
import { useStore } from '@/app/state'
import { userSelector } from '@/app/state/user'

export const LoansData = () => {
	const { userStats } = useStore(userSelector)

	return (
		<OverviewCards
			title='Loans Overview'
			content={loansOverviews}
			contentData={{
				totalDebt: `${formatUnits(userStats.debt, 6)} SBC`,
				totalBorrowed: `${formatUnits(userStats.borrowed, 6)} SBC`,
				totalWeeklyInterest: '0',
			}}
			className='grid grid-cols-1 gap-3 md:grid-cols-3'
		/>
	)
}
