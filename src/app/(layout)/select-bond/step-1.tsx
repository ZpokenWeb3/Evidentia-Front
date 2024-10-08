'use client'

import { Hash, StickyNote } from 'lucide-react'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { InputIcon } from '../../components/input-icon'
import { SelectIcon } from '../../components/select-icon'
import { Button } from '../../components/ui/button'
import { allBonds } from '../../config/bonds'

interface Step1Props {
	amount: string
	select: string
	setAmount: Dispatch<SetStateAction<string>>
	setSelect: Dispatch<SetStateAction<string>>
	setStep: Dispatch<SetStateAction<1 | 2>>
}

export const Step1 = ({
	amount,
	select,
	setAmount,
	setSelect,
	setStep,
}: Step1Props) => {
	const options = useMemo(() => {
		return allBonds.map(i => ({
			label: i.ISIN,
			value: i.tokenId,
		}))
	}, [])
	return (
		<div className='w-[524px] flex flex-col gap-10 items-center'>
			<p className='text-xl font-semibold'>Select Bond</p>
			<form
				onSubmit={e => {
					e.preventDefault()
					setStep(2)
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
					<Button>Prepare</Button>
				</div>
			</form>
		</div>
	)
}
