'use client'

import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { InputIcon } from '@/app/components/input-icon'
import { Button } from '@/app/components/ui/button'
import { addresses } from '@/app/config/addresses'
import { useStore } from '@/app/state'
import { userSelector } from '@/app/state/user'
import { Coins } from 'lucide-react'
import { useState } from 'react'
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb'
import { thirdwebClient } from '@/app/config/thirdweb'
import { formatUnits, parseUnits } from 'ethers/lib/utils'

export const Unstake = () => {
	const chain = useActiveWalletChain()
	const account = useActiveAccount()
	const { mutateAsync } = useSendTransaction()

	const { userStake, mainERC20, fetchStake, fetchERC20 } =
		useStore(userSelector)
	const [amount, setAmount] = useState('')

	const unstake = async () => {
		if (!account || !chain) return
		try {
			const contracts = addresses[chain.id]

			const { STABLE_COINS_STAKING } = contracts

			const contract = getContract({
				chain: chain,
				address: STABLE_COINS_STAKING,
				client: thirdwebClient,
			})

			const tx = prepareContractCall({
				contract,
				method: 'function withdraw(uint256 amount)',
				params: [parseUnits(amount, mainERC20.decimals).toBigInt()],
			})

			const { transactionHash } = await mutateAsync(tx)

			await waitForReceipt({
				client: thirdwebClient,
				chain: chain!,
				transactionHash,
			})

			await fetchStake(account.address, chain)
			await fetchERC20(account.address, chain)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='flex flex-col gap-6'>
			<form
				className='flex flex-col gap-[18px]'
				onSubmit={e => {
					e.preventDefault()
					void unstake()
				}}
			>
				<InputIcon
					icon={<Coins className='size-5 stroke-2 text-input-icon' />}
					label='Amount of Unstaking'
					placeholder='Enter amount'
					value={amount}
					onChange={e => setAmount(e.target.value)}
				/>
				<Button>Unstake</Button>
			</form>
			<div className='flex flex-col gap-[6px]'>
				<div className='flex justify-between items-center'>
					<p className='text-[12px] leading-[18px] font-normal'>
						Your Staked Balance
					</p>
					<p className='text-[12px] leading-[18px] font-normal'>
						{formatUnits(userStake.stakedAmount, mainERC20.decimals)}
						{mainERC20.symbol}
					</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-[12px] leading-[18px] font-normal'>Your Balance</p>
					<p className='text-[12px] leading-[18px] font-normal'>
						{formatUnits(mainERC20.balance, mainERC20.decimals)}
						{mainERC20.symbol}
					</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-[12px] leading-[18px] font-normal'>
						Your Reward Amount
					</p>
					<p className='text-[12px] leading-[18px] font-normal'>
						{formatUnits(userStake.rewardsEarned, mainERC20.decimals)}
						{mainERC20.symbol}
					</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-[12px] leading-[18px] font-normal'>
						Next Reward Yield
					</p>
					<p className='text-[12px] leading-[18px] font-normal'>0.654%</p>
				</div>
				<div className='flex justify-between items-center'>
					<p className='text-[12px] leading-[18px] font-normal'>
						ROI (5 day Rate)
					</p>
					<p className='text-[12px] leading-[18px] font-normal'>8,4788%</p>
				</div>
			</div>
		</div>
	)
}