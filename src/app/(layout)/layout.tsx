import { Sidebar } from '../components/sidebar'
import { Header } from '../components/header'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex h-screen'>
			<Sidebar />
			<div className='flex grow flex-col'>
				<Header />
				<div className='grow overflow-y-auto px-5 pt-4'>{children}</div>
			</div>
		</div>
	)
}
