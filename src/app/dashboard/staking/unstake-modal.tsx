'use client'

import { ChartCandlestick, Coins } from 'lucide-react'
import { useState } from 'react'
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
import { cn } from '../../lib/utils'
import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { getContract, prepareContractCall } from 'thirdweb'
import { parseUnits } from 'ethers/lib/utils'
import { addresses } from '../../config/addresses'
import { thirdwebClient } from '../../config/thirdweb'

export const UnstakeModal = () => {
	const account = useActiveAccount()
	const chain = useActiveWalletChain()
	const { mutateAsync } = useSendTransaction()

	const [amount, setAmount] = useState('')
	const [open, setOpen] = useState<boolean>(false)

	const unstake = async () => {
		try {
			const contracts = addresses[chain!.id]
			if (!chain || !contracts || !account) return
			const { STABLE_COINS_STAKING } = contracts
			const value = parseUnits(amount, 6).toBigInt()

			const stakingContract = getContract({
				chain,
				address: STABLE_COINS_STAKING,
				client: thirdwebClient,
			})

			const withdrawTX = prepareContractCall({
				contract: stakingContract,
				method: 'function withdraw(uint256 amount)',
				params: [value],
			})

			await mutateAsync(withdrawTX)

			// await getUserData(account.address, chain)
		} catch (err) {
			console.log({ err })
		}
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger
				className={cn(buttonVariants({ variant: 'destructive' }), 'w-[151px]')}
			>
				Unstake
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>Unstake</DialogTitle>
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
					<p>
						Available to unstake:{' '}
						{/* {`${formatUnits(stakedAmount.toString(), 6)} SBC`} */}
					</p>
				</div>
				<DialogFooter>
					<Button
						className='w-[136px]'
						variant='destructive'
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
					<Button className='w-[136px]' onClick={() => void unstake()}>
						Unstake
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
