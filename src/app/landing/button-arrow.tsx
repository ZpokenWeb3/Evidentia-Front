import { MoveUpRight } from 'lucide-react'
import Link from 'next/link'

export const ButtonArrow = ({
	href,
	onClick,
}: {
	href?: string
	onClick?: () => void
}) => {
	return (
		<>
			{href ? (
				<Link
					href={href}
					className='group ease-out duration-300 transition-all rounded-full'
				>
					<div className='bg-[#D7D9E4] p-3 rounded-full w-fit group-hover:bg-[#232C56] cursor-pointer ease-out duration-300 transition-all'>
						<MoveUpRight className='size-8 group-hover:text-[#FFFFFF] ease-out duration-300 transition-all' />
					</div>
				</Link>
			) : (
				<div
					tabIndex={1}
					role='button'
					onClick={onClick}
					className='group ease-out duration-300 transition-all rounded-full'
				>
					<div className='bg-[#D7D9E4] p-3 rounded-full w-fit group-hover:bg-[#232C56] cursor-pointer ease-out duration-300 transition-all'>
						<MoveUpRight className='size-8 group-hover:text-[#FFFFFF] ease-out duration-300 transition-all' />
					</div>
				</div>
			)}
		</>
	)
}
