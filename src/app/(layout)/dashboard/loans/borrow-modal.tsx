'use client'

import { useStore } from '@/app/state'
import { userSelector } from '@/app/state/user'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ChartCandlestick, Coins, Newspaper } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	estimateGasCost,
	getContract,
	prepareContractCall,
	readContract,
	waitForReceipt,
} from 'thirdweb'
import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { InputIcon } from '../../../components/input-icon'
import { Button, buttonVariants } from '../../../components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../components/ui/dialog'
import { addresses } from '../../../config/addresses'
import { thirdwebClient } from '../../../config/thirdweb'
import { getStakingAndBorrowingContract } from '../../../lib/contracts'
import { cn } from '../../../lib/utils'

export const BorrowModal = () => {
	const account = useActiveAccount()
	const chain = useActiveWalletChain()
	const { mutateAsync } = useSendTransaction()
	const { fetchUserStats, fetchERC20 } = useStore(userSelector)

	const [amount, setAmount] = useState('')
	const [gas, setGas] = useState('0.00')
	const [open, setOpen] = useState<boolean>(false)
	const [collateral, setCollateral] = useState<bigint>(BigInt(0))

	const getBorrowTx = () => {
		const contracts = addresses[chain!.id]

		const { NFT_STAKING_AND_BORROWING } = contracts

		const contract = getContract({
			chain: chain!,
			address: NFT_STAKING_AND_BORROWING,
			client: thirdwebClient,
		})

		return prepareContractCall({
			contract,
			method: 'function borrow(uint256 amount)',
			params: [parseUnits(amount, 6).toBigInt()],
			gas: BigInt(2_000_000),
		})
	}

	useEffect(() => {
		void (async () => {
			if (!chain || !account) return

			try {
				const transaction = getBorrowTx()

				const gasCost = await estimateGasCost({
					transaction,
					from: account.address,
				})

				setGas(gasCost.ether)
			} catch {}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chain, account, amount])

	const fetchAvailableToBorrow = async () => {
		try {
			const contract = getStakingAndBorrowingContract(chain!)

			const userAvailableToBorrow = await readContract({
				contract,
				method: 'userAvailableToBorrow',
				params: [account!.address],
			})

			setCollateral(userAvailableToBorrow)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (!account || !chain) return

		void fetchAvailableToBorrow()
	}, [account, chain])

	const borrow = async () => {
		if (!account || !chain) return
		try {
			const { transactionHash } = await mutateAsync(getBorrowTx())

			await waitForReceipt({
				client: thirdwebClient,
				chain: chain!,
				transactionHash,
			})

			await fetchUserStats(account.address, chain)
			await fetchAvailableToBorrow()
			await fetchERC20(account.address, chain)
			setOpen(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger
				className={cn(buttonVariants({ variant: 'secondary' }), 'w-[151px]')}
			>
				Borrow
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>Borrow</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Amount</p>
						<InputIcon
							placeholder='Enter amount of borrow'
							icon={<Coins className='size-5 stroke-2 text-input-icon' />}
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
					</div>
					<p>Max to Borrow: {`${formatUnits(collateral.toString(), 6)} SBC`}</p>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Transaction Fee</p>
						<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
							<div>
								<Newspaper className='w-5 stroke-2 text-input-icon' />
							</div>
							<p className='break-all text-base font-medium text-[#161822]'>
								{gas} XRP
							</p>
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button
						className='w-[136px]'
						variant='destructive'
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button className='w-[136px]' onClick={() => void borrow()}>
						Borrow
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
