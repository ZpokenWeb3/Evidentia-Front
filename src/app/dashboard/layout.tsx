'use client'

import { useEffect } from 'react'
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react'
import { useStore } from '../state'
import { userSelector } from '../state/user'

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const chain = useActiveWalletChain()
	const account = useActiveAccount()
	const { fetchData, fetchUserStats } = useStore(userSelector)

	useEffect(() => {
		if (!chain || !account) return
		void fetchData(account.address, chain)
		void fetchUserStats(account.address, chain)
	}, [chain, account])
	return <>{children}</>
}
