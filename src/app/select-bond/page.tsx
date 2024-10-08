'use client'

import {
	useActiveAccount,
	useActiveWalletChain,
	useSendTransaction,
} from 'thirdweb/react'
import { useState } from 'react'
import { setAllowedMints } from '../lib/admin-func'
import { useRouter } from 'next/navigation'
import { PagePath } from '../config/nav'
import { Step1 } from './step-1'
import { Step2 } from './step-2'
import {
	getContract,
	prepareContractCall,
	readContract,
	waitForReceipt,
} from 'thirdweb'
import { addresses } from '../config/addresses'
import { thirdwebClient } from '../config/thirdweb'

export default function SelectBond() {
	const router = useRouter()
	const account = useActiveAccount()
	const { mutateAsync } = useSendTransaction()
	const chain = useActiveWalletChain()
	const [select, setSelect] = useState('')
	const [amount, setAmount] = useState('')
	const [step, setStep] = useState<1 | 2>(1)

	const mint = async () => {
		if (!account?.address || !chain) return
		void (async () => {
			try {
				const tokenId = BigInt(select)
				const value = BigInt(amount)

				await setAllowedMints(account?.address, tokenId, value, chain)

				const contract = getContract({
					chain: chain!,
					address: addresses[chain!.id]!.BOND_NFT,
					client: thirdwebClient,
				})

				const availableToMint = await readContract({
					contract,
					method: 'function remainingMints(address user, uint256 id)',
					params: [account.address, tokenId],
				})

				const transaction = prepareContractCall({
					contract,
					method: 'function mint(uint256 tokenId, uint256 amount, bytes data)',
					params: [tokenId, availableToMint, '0x'],
				})

				const { transactionHash } = await mutateAsync(transaction)

				await waitForReceipt({
					client: thirdwebClient,
					chain,
					transactionHash,
				})

				router.push(PagePath.Dashboard)
			} catch (error) {
				console.log(error)
			}
		})()
	}

	return (
		<div className='flex min-h-full flex-col gap-3 pb-6'>
			<div className='flex grow flex-col items-center rounded bg-background-secondary pb-7 pt-6  shadow-[0px_4px_4px_0px_#00000040]'>
				{step === 1 && (
					<Step1
						amount={amount}
						select={select}
						setAmount={setAmount}
						setSelect={setSelect}
						setStep={setStep}
					/>
				)}
				{step === 2 && <Step2 mint={mint} />}
			</div>
		</div>
	)
}
