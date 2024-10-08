'use client'

import { Hash, StickyNote } from 'lucide-react'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { Button } from '../components/ui/button'
import { SelectIcon } from '../components/select-icon'
import { InputIcon } from '../components/input-icon'
import { useMemo, useState } from 'react'
import { allBonds } from '../config/bonds'
import { setAllowedMints } from '../lib/admin-func'
import { useRouter } from 'next/navigation'
import { PagePath } from '../config/nav'

export default function SelectBond() {
	const router = useRouter()
	const account = useActiveAccount()
	const chain = useActiveWalletChain()
	const [select, setSelect] = useState('')
	const [amount, setAmount] = useState('')

	const options = useMemo(() => {
		return allBonds.map(i => ({
			label: i.ISIN,
			value: i.tokenId,
		}))
	}, [])

	return (
		<div className='flex min-h-full flex-col gap-3 pb-6'>
			<div className='flex grow flex-col items-center rounded bg-background-secondary pb-7 pt-6  shadow-[0px_4px_4px_0px_#00000040]'>
				<div className='w-[524px] flex flex-col gap-10 items-center'>
					<p className='text-xl font-semibold'>Select Bond</p>
					<form
						onSubmit={e => {
							e.preventDefault()

							if (!account?.address || !chain) return

							void (async () => {
								try {
									await setAllowedMints(
										account?.address,
										BigInt(select),
										BigInt(amount),
										chain
									)

									router.push(PagePath.Dashboard)
								} catch (error) {
									console.log(error)
								}
							})()
						}}
						className='flex flex-col gap-4 w-full'
					>
						<SelectIcon
							label='Bond'
							select={{
								onValueChange: value => setSelect(value),
								value: select,
							}}
							selectValue={{ placeholder: 'Select a bond' }}
							icon={<StickyNote className='size-5 stroke-2 text-input-icon' />}
							options={options}
						/>
						<InputIcon
							label='Amount'
							icon={<Hash className='size-5 stroke-2 text-input-icon' />}
							placeholder='Enter amount'
							value={amount}
							onChange={e => setAmount(e.target.value)}
						/>
						<div className='flex items-center justify-between'>
							<Button variant='destructive'>Cancel</Button>
							<Button>Sign</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
