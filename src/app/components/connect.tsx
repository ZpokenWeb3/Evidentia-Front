import { ConnectButton } from 'thirdweb/react'
import { thirdwebClient, wallets, xrpLedger } from '../config/thirdweb'

export const Connect = () => {
	return (
		<ConnectButton
			client={thirdwebClient}
			wallets={wallets}
			chain={xrpLedger}
		/>
	)
}
