import { Address } from 'thirdweb'
import { ChainOptions } from 'thirdweb/chains'

interface Addresses {
	[chainId: ChainOptions['id']]: {
		STABLE_BOND_COINS: Address
		BOND_NFT: Address
		NFT_STAKING_AND_BORROWING: Address
		STABLE_COINS_STAKING: Address
	}
}

export const addresses: Addresses = {
	1440002: {
		STABLE_BOND_COINS: '0x9AC0a1F7AF0a9f17e39564Fa064AE95F02a77e17',
		BOND_NFT: '0x91c80780c797a99433E4E69e11BF912Ba2C18b7f',
		NFT_STAKING_AND_BORROWING: '0xf6f32943836c1EB92143E4EFEc0C62B2AE0CeB69',
		STABLE_COINS_STAKING: '0x17b56430f0c6E89af2916438225D9d822723f680',
	},
}
