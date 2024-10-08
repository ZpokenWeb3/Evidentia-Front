import { ChainOptions } from 'thirdweb/chains'

export interface ERC20 {
	name: string
	symbol: string
	decimals: number
	address: {
		[chainId: ChainOptions['id']]: string
	}
}

export interface UserERC20 extends ERC20 {
	balance: bigint
}
