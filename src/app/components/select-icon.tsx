'use client'

import { ReactNode, useState } from 'react'
import {
	SelectProps,
	SelectTriggerProps,
	SelectValueProps,
} from '@radix-ui/react-select'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

export interface SelectOption {
	label: string
	value: string
}

interface SelectIconProps {
	icon: ReactNode
	select?: SelectProps
	selectTrigger?: SelectTriggerProps
	selectValue?: SelectValueProps
	options: SelectOption[]
	label?: string
}

export const SelectIcon = ({
	icon,
	select,
	selectTrigger,
	selectValue,
	options,
	label,
}: SelectIconProps) => {
	const [openSelect, setOpenSelect] = useState<boolean>(false)
	return (
		<div className='flex w-full flex-col gap-2'>
			{label && <p className='text-base font-semibold'>{label}</p>}
			<div className='flex h-11 w-full items-center gap-3 rounded-lg border border-input-border bg-input px-3 py-[10px]'>
				{icon}
				<Select
					{...select}
					open={openSelect}
					onOpenChange={open => setOpenSelect(open)}
				>
					<SelectTrigger {...selectTrigger} open={openSelect}>
						<SelectValue {...selectValue} />
					</SelectTrigger>
					<SelectContent>
						{options.map(i => (
							<SelectItem key={i.value} value={i.value}>
								{i.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}
