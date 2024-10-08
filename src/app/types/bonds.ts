export enum BondStatus {
	SUBMITTED = 'Submitted',
	REJECTED = 'Rejected',
	READY_FOR_MINT = 'Ready for Mint',
	MINTED = 'Minted',
	UNDER_COLLATERAL = 'Under collateral',
}

export interface Bond {
	APY: number
	country: string
	value: number
	couponValue: number
	issueTimestamp: number
	expirationTimestamp: number
	ISIN: string
	tokenId: string
}

export interface UserBond {
	availableToMint: bigint
	status: BondStatus
	ISIN: string
	stakedNft: bigint
}
