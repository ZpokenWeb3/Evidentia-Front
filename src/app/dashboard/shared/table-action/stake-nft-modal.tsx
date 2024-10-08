'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import { ChartCandlestick, Coins, Hash, Newspaper } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	estimateGasCost,
	getContract,
	prepareContractCall,
	waitForReceipt,
} from 'thirdweb'
import {
	useActiveWalletChain,
	useSendTransaction,
	useActiveAccount,
} from 'thirdweb/react'
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
import { userSelector } from '@/app/state/user'
import { useStore } from '@/app/state'

interface StakeNftModalProps {
	bond: UserBond
}

export const StakeNftModal = ({ bond }: StakeNftModalProps) => {
	const chain = useActiveWalletChain()
	const account = useActiveAccount()
	const { mutateAsync } = useSendTransaction()
	const { fetchData } = useStore(userSelector)

	const [open, setOpen] = useState<boolean>(false)
	const [amount, setAmount] = useState('')
	const [gas, setGas] = useState('0.0')
	console.log({ gas })

	const getStakeTx = () => {
		const contract = getContract({
			chain: chain!,
			address: addresses[chain!.id].NFT_STAKING_AND_BORROWING,
			client: thirdwebClient,
		})

		return prepareContractCall({
			contract,
			method:
				'function stakeNFT(address nftAddress, uint256 tokenId, uint256 amount)',
			params: [
				addresses[chain!.id].BOND_NFT,
				BigInt(bond.tokenId),
				BigInt(amount),
			],
		})
	}

	useEffect(() => {
		void (async () => {
			if (!chain || !account || !amount) return

			try {
				const transaction = getStakeTx()

				const gasCost = await estimateGasCost({
					transaction,
					from: account.address,
				})

				console.log(gasCost)

				setGas(gasCost.ether)
			} catch (error) {
				console.log(error)
			}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chain, account, bond, amount])

	const stake = async () => {
		const contracts = addresses[chain!.id]
		if (!chain || !contracts || !account) return

		const { BOND_NFT, NFT_STAKING_AND_BORROWING } = contracts

		try {
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

			const { transactionHash: approveHash } = await mutateAsync(approveTx)

			await waitForReceipt({
				client: thirdwebClient,
				chain,
				transactionHash: approveHash,
			})

			// Stake NFT
			const stakeTx = getStakeTx()

			const { transactionHash } = await mutateAsync(stakeTx)

			await waitForReceipt({
				client: thirdwebClient,
				chain,
				transactionHash,
			})

			await fetchData(account.address, chain)

			setOpen(false)
		} catch (error) {
			console.log(error)
		}
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
						<p>Available to Stake: {bond.minted.toString()}</p>
					</div>
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
					<Button className='w-[136px]' onClick={() => void stake()}>
						Stake
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
