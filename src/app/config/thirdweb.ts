import { createThirdwebClient, defineChain } from 'thirdweb'
import { createWallet, Wallet } from 'thirdweb/wallets'

const clientId = process.env['NEXT_PUBLIC_CLIENT_ID']

if (!clientId) {
	throw new Error('No client ID provided')
}

export const thirdwebClient = createThirdwebClient({
	clientId,
})

export const wallets = [createWallet('io.metamask')] as Wallet[]

export const xrpLedger = /* @__PURE__ */ defineChain({
	id: 1440002,
	name: 'XRP Ledger EVM Devnet Sidechain',
	nativeCurrency: {
		name: 'XRP',
		symbol: 'XRP',
		decimals: 18,
	},
	blockExplorers: [
		{
			name: 'XRPL EVM Explorer',
			url: 'https://explorer.xrplevm.org/',
		},
	],
})
