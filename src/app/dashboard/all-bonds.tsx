'use client'

import { BondStatus } from '../types/bonds'
import { DataTable } from '../components/data-table'
import { allBondHeader } from './constants'

const getStatus = (
	allowedMints: bigint,
	availableToMint: bigint,
	stakedNft: bigint
) => {
	if (!allowedMints) {
		return BondStatus.SUBMITTED
	} else if (availableToMint) {
		return BondStatus.READY_FOR_MINT
	} else if (stakedNft) {
		return BondStatus.UNDER_COLLATERAL
	} else {
		return BondStatus.MINTED
	}
}

export const AllBonds = () => {
	return <DataTable headers={allBondHeader} data={[]} />
}
