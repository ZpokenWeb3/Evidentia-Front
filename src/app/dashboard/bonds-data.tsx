'use client'

import { bondOverviews } from './constants'
import { OverviewCards } from './shared/overview-cards'

export const BondsData = () => {
	return (
		<OverviewCards
			title='Bonds Overview'
			content={bondOverviews}
			contentData={{}}
		/>
	)
}
