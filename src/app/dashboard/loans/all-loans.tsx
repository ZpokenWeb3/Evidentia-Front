'use client'

import { DataTable } from '@/app/components/data-table'
import { allLoansHeader } from './constants'
import { useStore } from '@/app/state'
import { userSelector } from '@/app/state/user'
import { formatUnits } from 'ethers/lib/utils'

export const AllLoans = () => {
	const { userStats } = useStore(userSelector)

	return (
		<DataTable
			headers={allLoansHeader}
			data={[
				{
					currency: 'SBC',
					weeklyInterest: '0',
					borrowed: formatUnits(userStats.borrowed, 6),
					debt: formatUnits(userStats.debt, 6),
				},
			]}
		/>
	)
}
