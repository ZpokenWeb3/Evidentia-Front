'use client'

import { useStore } from '../state'
import { userSelector } from '../state/user'
import { bondOverviews } from './constants'
import { OverviewCards } from './shared/overview-cards'

export const BondsData = () => {
	const { userBonds } = useStore(userSelector)
	return (
		<OverviewCards
			title='Bonds Overview'
			content={bondOverviews}
			contentData={{
				bonds: `${userBonds.length}`,
				collateral: `${userBonds.reduce(
					(acc, i) => acc + i.staked,
					BigInt(0)
				)}`,
				rwa: `${userBonds.reduce((acc, i) => acc + i.minted, BigInt(0))}`,
			}}
		/>
	)
}
