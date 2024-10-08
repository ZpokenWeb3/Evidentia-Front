import { ReactNode } from 'react'
import { Input, InputProps } from './ui/input'

interface InputIconProps extends InputProps {
	icon: ReactNode
	label?: string
}

export const InputIcon = ({ icon, label, ...props }: InputIconProps) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			{label && <p className='text-base font-semibold'>{label}</p>}
			<div className='flex h-11 w-full items-center gap-3 rounded-lg border border-input-border bg-input px-3 py-[10px]'>
				{icon}
				<Input variant='transparent' {...props} />
			</div>
		</div>
	)
}
