import { createThirdwebClient } from 'thirdweb'
import { mainnet, sepolia } from 'thirdweb/chains'
import { inAppWallet, SmartWalletOptions, Wallet } from 'thirdweb/wallets'

const clientId = process.env['NEXT_PUBLIC_CLIENT_ID']

if (!clientId) {
	throw new Error('No client ID provided')
}

export const thirdwebClient = createThirdwebClient({
	clientId,
})

export const wallets = [inAppWallet()] as Wallet[]

const factoryAddress = process.env['NEXT_PUBLIC_ACCOUNT_FACTORY']

if (!factoryAddress) {
	throw new Error('No factory address provided')
}

export const accountAbstraction: SmartWalletOptions = {
	sponsorGas: true,
	chain: process.env['NEXT_PUBLIC_ENV'] === 'development' ? sepolia : mainnet,
	factoryAddress,
}
