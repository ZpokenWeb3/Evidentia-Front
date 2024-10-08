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
		STABLE_BOND_COINS: '0x791E5F801C2c3BA0B93Ad123b71Ee4c9b7d1b45F',
		BOND_NFT: '0x49E179A7215B19e692AF2611c74370719c2837C3',
		NFT_STAKING_AND_BORROWING: '0xe3b72A440c020fe29d8c7426636d040386c0e68f',
		STABLE_COINS_STAKING: '0x8dEbA176D0276318AF6FaB831a18869F67Ff8d5f',
	},
}
