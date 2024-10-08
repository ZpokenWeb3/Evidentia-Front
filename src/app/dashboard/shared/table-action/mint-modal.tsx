'use client'

import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { useEffect, useState } from 'react'
import { hashString } from '../../../lib/string'
import { estimateGasCost, getContract, prepareContractCall } from 'thirdweb'
import { addresses } from '../../../config/addresses'
import { thirdwebClient } from '../../../config/thirdweb'
import {
	BookUser,
	ChartCandlestick,
	Hash,
	Newspaper,
	Wallet,
} from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { UserBond } from '@/app/types/bonds'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/app/components/ui/dialog'

interface MintModalProps {
	bond: UserBond
	updateBond: (ISIN: string) => Promise<void>
}

export const MintModal = ({ bond, updateBond }: MintModalProps) => {
	const [open, setOpen] = useState<boolean>(false)
	const [gas, setGas] = useState<string>('')
	const chain = useActiveWalletChain()
	const account = useActiveAccount()
	const { mutateAsync } = useSendTransaction()

	const getMintTx = () => {
		const tokenId = BigInt(hashString(bond.ISIN))

		const contract = getContract({
			chain: chain!,
			address: addresses[chain!.id]!.BOND_NFT,
			client: thirdwebClient,
		})

		return prepareContractCall({
			contract,
			method: 'function mint(uint256 tokenId, uint256 amount, bytes data)',
			params: [tokenId, bond.availableToMint, '0x'],
		})
	}

	useEffect(() => {
		void (async () => {
			if (!chain || !account) return

			try {
				const transaction = getMintTx()

				const gasCost = await estimateGasCost({
					transaction,
					from: account.address,
				})

				setGas(gasCost.ether)
			} catch {}
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chain, account, bond])

	const mint = async () => {
		if (!chain || !account) return

		try {
			const transaction = getMintTx()

			await mutateAsync(transaction)

			await updateBond(bond.ISIN)
			setOpen(false)
		} catch {}
	}

	return (
		<Dialog open={open} onOpenChange={open => setOpen(open)}>
			<DialogTrigger className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'>
				Mint
			</DialogTrigger>
			<DialogContent className='w-[438px]'>
				<DialogHeader className='flex flex-row items-center gap-2'>
					<div>
						<ChartCandlestick className='size-6 stroke-2 text-icon' />
					</div>
					<DialogTitle className='text-xl font-medium'>Mint</DialogTitle>
				</DialogHeader>
				<div className='flex flex-col gap-4'>
					{chain && chain.blockExplorers && chain.blockExplorers[0] && (
						<div className='flex flex-col gap-2'>
							<p className='text-base font-semibold'>Contract Address</p>
							<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
								<div>
									<BookUser className='w-5 stroke-2 text-input-icon' />
								</div>
								<a
									href={`${chain.blockExplorers[0].url}/address/${
										addresses[chain.id]?.BOND_NFT
									}`}
									target='_blank'
									rel='noopener noreferrer'
									className='break-all text-base font-medium text-[#161822] underline'
								>
									{addresses[chain.id]?.BOND_NFT}
								</a>
							</div>
						</div>
					)}
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Token ID</p>
						<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
							<div>
								<Hash className='w-5 stroke-2 text-input-icon' />
							</div>
							<p className='break-all text-base font-medium text-[#161822]'>
								{BigInt(hashString(bond.ISIN)).toString()}
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Token Amount</p>
						<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
							<div>
								<Wallet className='w-5 stroke-2 text-input-icon' />
							</div>
							<p className='break-all text-base font-medium text-[#161822]'>
								{bond.availableToMint.toString()}
							</p>
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<p className='text-base font-semibold'>Transaction Fee</p>
						<div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
							<div>
								<Newspaper className='w-5 stroke-2 text-input-icon' />
							</div>
							<p className='break-all text-base font-medium text-[#161822]'>
								{gas} ETH
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
					<Button className='w-[136px]' onClick={() => void mint()}>
						Mint
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
