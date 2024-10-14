'use client'

import {
	BookUser,
	Hash,
	MapPin,
	StickyNote,
	User,
	UserSearch,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { PagePath } from '../config/nav'
import { InputIcon } from '../components/input-icon'
import { SelectIcon } from '../components/select-icon'
import { Button } from '../components/ui/button'

export default function KYC() {
	const router = useRouter()
	return (
		<div className='flex min-h-full flex-col gap-3 pb-6'>
			<div className='flex grow flex-col items-center rounded bg-background-secondary pb-7 pt-6  shadow-[0px_4px_4px_0px_#00000040]'>
				<div className='w-[524px] flex flex-col gap-10 items-center'>
					<p className='text-xl font-semibold'>
						Know Your Customer (KYC) verification.
					</p>
					<form
						onSubmit={e => {
							e.preventDefault()
							localStorage.setItem('KYC', 'true')
							router.push(PagePath.SelectBond)
						}}
						className='flex flex-col gap-10 w-full'
					>
						<div className='flex flex-col gap-4'>
							<InputIcon
								label='First name'
								icon={<User className='size-5 stroke-2 text-input-icon' />}
								placeholder='Enter your first name'
							/>

							<InputIcon
								label='Last name'
								icon={
									<UserSearch className='size-5 stroke-2 text-input-icon' />
								}
								placeholder='Enter your last name'
							/>
							<SelectIcon
								label='Type of ID'
								selectValue={{ placeholder: 'Select a type' }}
								icon={
									<StickyNote className='size-5 stroke-2 text-input-icon' />
								}
								options={[
									{
										label: 'ID Card',
										value: 'id',
									},
								]}
							/>
							<InputIcon
								label='ID number'
								icon={<Hash className='size-5 stroke-2 text-input-icon' />}
								placeholder='Enter your ID number'
							/>
							<InputIcon
								label='Residency or country of registration'
								icon={<MapPin className='size-5 stroke-2 text-input-icon' />}
								placeholder='Enter your country'
							/>
							<InputIcon
								label='Address'
								icon={<BookUser className='size-5 stroke-2 text-input-icon' />}
								placeholder='Enter your address'
							/>
						</div>
						<div className='flex items-center justify-between'>
							<Button variant='destructive'>Cancel</Button>
							<Button>Submit</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
