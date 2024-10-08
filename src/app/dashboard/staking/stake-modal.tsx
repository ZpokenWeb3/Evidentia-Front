'use client'

import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ChartCandlestick, Coins } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getContract, prepareContractCall, readContract } from 'thirdweb'
import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { InputIcon } from '../../components/input-icon'
import { Button, buttonVariants } from '../../components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../components/ui/dialog'
import { addresses } from '../../config/addresses'
import { thirdwebClient } from '../../config/thirdweb'
import { getStableBondCoins } from '../../lib/contracts'
import { cn } from '../../lib/utils'

export const StakeModal = () => {
	const account = useActiveAccount()
	const chain = useActiveWalletChain()
	const { mutateAsync } = useSendTransaction()

	const [amount, setAmount] = useState('')
	const [open, setOpen] = useState<boolean>(false)
	const [userBalance, setUserBalance] = useState<bigint>(BigInt(0))

	const getBalance = async () => {
		if (!chain || !account) return

		const contract = getStableBondCoins(chain)

		const balance = await readContract({
			contract,
			method: 'balanceOf',
			params: [account.address],
		})

		setUserBalance(balance)
	}

	useEffect(() => {
		if (!account || !chain) return

		void (async () => {
			try {
				await getBalance()
			} catch {}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [account, chain])

	const stake = async () => {
		try {
			const contracts = addresses[chain!.id]
			if (!chain || !contracts || !account) return
			const { STABLE_COINS_STAKING, STABLE_BOND_COINS } = contracts
			const value = parseUnits(amount, 6).toBigInt()

			// Approve nfts for NFT_STAKING_AND_BORROWING contract
			const ercContract = getContract({
				chain,
				address: STABLE_BOND_COINS,
				client: thirdwebClient,
			})

			const approveTx = prepareContractCall({
				contract: ercContract,
				method: 'function approve(address spender, uint256 value)',
				params: [STABLE_COINS_STAKING, value],
			})

			await mutateAsync(approveTx)

			//Stake

			const stakingContract = getContract({
				chain,
				address: STABLE_COINS_STAKING,
				client: thirdwebClient,
			})

			const stakeTx = prepareContractCall({
				contract: stakingContract,
				method: 'function stake(uint256 amount)',
				params: [value],
			})

			await mutateAsync(stakeTx)

			await getBalance()
		} catch {}
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger
				className={cn(buttonVariants({ variant: 'default' }), 'w-[151px]')}
			>
				Stake
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>Stake</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Amount</p>
						<InputIcon
							placeholder='Enter amount'
							icon={<Coins className='size-5 stroke-2 text-input-icon' />}
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<p>Balance: {`${formatUnits(userBalance.toString(), 6)} SBC`}</p>
				</div>
				<DialogFooter>
					<Button
						className='w-[136px]'
						variant='destructive'
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button className='w-[136px]' onClick={() => void stake()}>
						Stake
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
