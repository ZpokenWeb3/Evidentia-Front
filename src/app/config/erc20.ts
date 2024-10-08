import { ERC20 } from '../types/erc20'

export const SBC: ERC20 = {
	name: 'Stable Bond Coins',
	symbol: 'SBC',
	decimals: 6,
	address: {
		1440002: '0x9AC0a1F7AF0a9f17e39564Fa064AE95F02a77e17',
	},
}

export const erc20: ERC20[] = [SBC]
