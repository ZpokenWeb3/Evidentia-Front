'use client'

import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { useEffect, useState } from 'react'
import { addresses } from '../../../config/addresses'
import { getContract, prepareContractCall, readContract } from 'thirdweb'
import { thirdwebClient } from '../../../config/thirdweb'
import { cutString, hashString } from '../../../lib/string'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../../../components/ui/dialog'
import { ChartCandlestick, Coins, Hash } from 'lucide-react'
import { InputIcon } from '../../../components/input-icon'
import { Button } from '../../../components/ui/button'
import { UserBond } from '@/app/types/bonds'
import { getStakingAndBorrowingContract } from '@/app/lib/contracts'

interface UnstakeNftModalProps {
	bond: UserBond
}

export const UnstakeNftModal = ({ bond }: UnstakeNftModalProps) => {
	const chain = useActiveWalletChain()
	const account = useActiveAccount()
	const { mutateAsync } = useSendTransaction()

	const [open, setOpen] = useState<boolean>(false)
	const [amount, setAmount] = useState('')

	useEffect(() => {}, [amount, account])

	useEffect(() => {
		if (!account || !chain) return

		void (async () => {
			console.log(
				await readContract({
					contract: getStakingAndBorrowingContract(chain),
					method: 'userNFTs',
					params: [
						account.address,
						addresses[chain.id]!.BOND_NFT,
						BigInt(hashString(bond.ISIN)),
					],
				})
			)
		})()
	}, [account, chain])

	const stake = async () => {
		const contracts = addresses[chain!.id]
		if (!chain || !contracts) return

		const { BOND_NFT, NFT_STAKING_AND_BORROWING } = contracts

		const stakeContract = getContract({
			chain: chain,
			address: NFT_STAKING_AND_BORROWING,
			client: thirdwebClient,
		})

		const stakeTx = prepareContractCall({
			contract: stakeContract,
			method:
				'function unstakeNFT(address nftAddress, uint256 tokenId, uint256 amount)',
			params: [BOND_NFT, BigInt(hashString(bond.ISIN)), BigInt(amount)],
		})

		const res = await mutateAsync(stakeTx)

		console.log({ res })
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'>
				Unstake
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>
						Unstake Bond NFT
					</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Token ID</p>
						<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
							<div>
								<Hash className='w-5 stroke-2 text-input-icon' />
							</div>
							<p className='break-all text-base font-medium text-[#161822]'>
								{cutString(BigInt(hashString(bond.ISIN)).toString(), 7, 7)}
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Amount</p>
						<InputIcon
							placeholder='Enter amount'
							icon={<Coins className='size-5 stroke-2 text-input-icon' />}
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
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
					<Button className='w-[136px]' onClick={() => void stake()}>
						Stake
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
