import { ConnectButton } from 'thirdweb/react'
import { accountAbstraction, thirdwebClient, wallets } from '../config/thirdweb'

export const Connect = () => {
	return (
		<ConnectButton
			client={thirdwebClient}
			wallets={wallets}
			accountAbstraction={accountAbstraction}
		/>
	)
}
