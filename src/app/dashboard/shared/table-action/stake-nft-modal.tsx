'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { ChartCandlestick, Coins, Hash } from 'lucide-react'
import { useState } from 'react'
import { getContract, prepareContractCall } from 'thirdweb'
import { useActiveWalletChain, useSendTransaction } from 'thirdweb/react'
import { InputIcon } from '../../../components/input-icon'
import { Button } from '../../../components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from '../../../components/ui/dialog'
import { addresses } from '../../../config/addresses'
import { thirdwebClient } from '../../../config/thirdweb'
import { cutString, hashString } from '../../../lib/string'
import { UserBond } from '@/app/types/bonds'

interface StakeNftModalProps {
	bond: UserBond
}

export const StakeNftModal = ({ bond }: StakeNftModalProps) => {
	const chain = useActiveWalletChain()
	const { mutateAsync } = useSendTransaction()

	const [open, setOpen] = useState<boolean>(false)
	const [amount, setAmount] = useState('')

	const stake = async () => {
		const contracts = addresses[chain!.id]
		if (!chain || !contracts) return

		const { BOND_NFT, NFT_STAKING_AND_BORROWING } = contracts

		// Approve nfts for NFT_STAKING_AND_BORROWING contract

		const nftContract = getContract({
			chain: chain,
			address: BOND_NFT,
			client: thirdwebClient,
		})

		const approveTx = prepareContractCall({
			contract: nftContract,
			method: 'function setApprovalForAll(address operator, bool approved)',
			params: [NFT_STAKING_AND_BORROWING, true],
		})

		await mutateAsync(approveTx)

		// Stake NFT

		const stakeContract = getContract({
			chain: chain,
			address: NFT_STAKING_AND_BORROWING,
			client: thirdwebClient,
		})

		const stakeTx = prepareContractCall({
			contract: stakeContract,
			method:
				'function stakeNFT(address nftAddress, uint256 tokenId, uint256 amount)',
			params: [BOND_NFT, BigInt(hashString(bond.ISIN)), BigInt(amount)],
		})

		await mutateAsync(stakeTx)
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'>
				Stake
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>
						Stake Bond NFT
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
