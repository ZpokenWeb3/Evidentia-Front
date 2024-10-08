'use client'

import { DataTable } from '@/app/components/data-table'
import { allLoansHeader } from './constants'
import { useStore } from '@/app/state'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { userSelector } from '@/app/state/user'
import { formatUnits } from 'ethers/lib/utils'
import { Wallet } from 'lucide-react'
import { Address } from 'thirdweb'

export const AllLoans = () => {
	const account = useActiveAccount()
	const chain = useActiveWalletChain()
	const { userStats, mainERC20 } = useStore(userSelector)

	return (
		<DataTable
			headers={allLoansHeader}
			data={[
				{
					currency: (
						<div className='flex items-center gap-2'>
							<p>{mainERC20.symbol}</p>
							<div
								tabIndex={1}
								role='button'
								onClick={() => {
									void (async () => {
										if (account && chain && account.watchAsset) {
											await account.watchAsset({
												type: 'ERC20',
												options: {
													address: mainERC20.address[chain.id],
													symbol: mainERC20.symbol,
													decimals: mainERC20.decimals,
												},
											})
										}
									})()
								}}
							>
								<Wallet className='size-5 stroke-2 text-input-icon cursor-pointer' />
							</div>
						</div>
					),
					weeklyInterest: '0',
					borrowed: formatUnits(userStats.borrowed, mainERC20.decimals),
					debt: formatUnits(userStats.debt, mainERC20.decimals),
				},
			]}
		/>
	)
}
