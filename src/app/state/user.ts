import { Chain, readContract } from 'thirdweb'
import { AllSlices, SliceCreator } from '.'
import { allBonds } from '../config/bonds'
import {
	getNftContract,
	getStakingAndBorrowingContract,
} from '../lib/contracts'
import { BondStatus, UserBond } from '../types/bonds'
import { addresses } from '../config/addresses'
import { UserStats } from '../types/user'

const ZERO_BIG_INT = BigInt(0)

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
	userStats: UserStats
	fetchUserStats: (account: string, chain: Chain) => Promise<void>
}

export const createUserSlice = (): SliceCreator<UserSlice> => set => {
	return {
		userBonds: [],
		userStats: {
			borrowed: ZERO_BIG_INT,
			debt: ZERO_BIG_INT,
			debtUpdateTimestamp: ZERO_BIG_INT,
			nominalAvailable: ZERO_BIG_INT,
			staked: ZERO_BIG_INT,
		},
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

		fetchUserStats: async (account, chain) => {
			const stakingAndBorrowingContract = getStakingAndBorrowingContract(chain)

			const userStats = await readContract({
				contract: stakingAndBorrowingContract,
				method: 'getUserStats',
				params: [account],
			})

			set(state => {
				state.user.userStats = userStats
			})
		},
	}
}

export const userSelector = (state: AllSlices) => state.user
