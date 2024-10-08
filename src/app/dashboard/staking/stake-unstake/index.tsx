import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/app/components/ui/tabs'
import { Stake } from './stake'

export const StakeUnstake = () => {
	return (
		<div className='flex flex-col gap-4'>
			<p className='text-xl font-semibold'>Stake</p>
			<div className='flex items-start rounded-lg bg-card p-4 shadow-[0px_2px_2px_0px_#00000040] w-full'>
				<Tabs defaultValue='stake' className='w-full'>
					<TabsList>
						<TabsTrigger value='stake'>Stake</TabsTrigger>
						<TabsTrigger value='unstake'>Unstake</TabsTrigger>
					</TabsList>
					<TabsContent value='stake'>
						<Stake />
					</TabsContent>
					<TabsContent value='unstake'>Change your password here.</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}