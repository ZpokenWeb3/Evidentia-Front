'use client'

import { OverviewCards } from '../shared/overview-cards'
import { stakeOverviews } from './constants'

export const StakeData = () => {
	return (
		<OverviewCards
			title='Staking  Overview'
			content={stakeOverviews}
			contentData={{}}
		/>
	)
}
