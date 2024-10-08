'use client'

import { useStore } from '@/app/state'
import { OverviewCards } from '../shared/overview-cards'
import { stakeOverviews } from './constants'
import { userSelector } from '@/app/state/user'
import { formatUnits } from 'ethers/lib/utils'

export const StakeData = () => {
	const { userStake, mainERC20 } = useStore(userSelector)
	return (
		<OverviewCards
			title='Staking  Overview'
			content={stakeOverviews}
			contentData={{
				totalStaked: `${formatUnits(
					userStake.stakedAmount,
					mainERC20.decimals
				)} ${mainERC20.symbol}`,
				apy: `${userStake.expectedAPY / BigInt(10000)}%`,
				yearEarnings: `100 ${mainERC20.symbol}`,
			}}
		/>
	)
}
