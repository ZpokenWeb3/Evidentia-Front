import { Chain, readContract } from 'thirdweb'
import { AllSlices, SliceCreator } from '.'
import { allBonds } from '../config/bonds'
import {
	getNftContract,
	getStakingAndBorrowingContract,
} from '../lib/contracts'
import { BondStatus, UserBond } from '../types/bonds'
import { addresses } from '../config/addresses'

const getStatus = (
	allowedToMints: bigint,
	availableToMint: bigint,
	staked: bigint
) => {
	if (!allowedToMints) {
		return BondStatus.SUBMITTED
	} else if (availableToMint) {
		return BondStatus.READY_FOR_MINT
	} else if (staked) {
		return BondStatus.UNDER_COLLATERAL
	} else {
		return BondStatus.MINTED
	}
}

export interface UserSlice {
	userBonds: UserBond[]
	fetchData: (account: string, chain: Chain) => Promise<void>
}

export const createUserSlice = (): SliceCreator<UserSlice> => set => {
	return {
		userBonds: [],
		fetchData: async (account, chain) => {
			const allowedBonds = await Promise.all(
				allBonds.map(async i => {
					const nftContract = getNftContract(chain)

					const allowedToMints = await readContract({
						contract: nftContract,
						method: 'allowedMints',
						params: [account, BigInt(i.tokenId)],
					})

					if (!allowedToMints) return null

					const stakingAndBorrowingContract =
						getStakingAndBorrowingContract(chain)

					const staked = await readContract({
						contract: stakingAndBorrowingContract,
						method: 'userNFTs',
						params: [account, addresses[chain.id]!.BOND_NFT, BigInt(i.tokenId)],
					})

					const availableToMint = await readContract({
						contract: nftContract,
						method: 'remainingMints',
						params: [account, BigInt(i.tokenId)],
					})

					const minted = await readContract({
						contract: nftContract,
						method: 'balanceOf',
						params: [account, BigInt(i.tokenId)],
					})

					console.log(minted)

					return {
						...i,
						allowedToMints,
						availableToMint,
						staked,
						minted,
						status: getStatus(allowedToMints, availableToMint, staked),
					}
				})
			)

			const filtered = allowedBonds.filter(i => i !== null)

			set(state => {
				state.user.userBonds = filtered
			})
		},
	}
}

export const userSelector = (state: AllSlices) => state.user
