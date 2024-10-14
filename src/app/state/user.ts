import { Chain, getContract, readContract } from 'thirdweb';
import { AllSlices, SliceCreator } from '.';
import { StableBondCoinsAbi } from '../abi/StableBondCoins';
import { addresses } from '../config/addresses';
import { allBonds } from '../config/bonds';
import { erc20, SBC } from '../config/erc20';
import { thirdwebClient } from '../config/thirdweb';
import {
  getNftContract,
  getStableCoinsStaking,
  getStakingAndBorrowingContract,
} from '../lib/contracts';
import { BondStatus, UserBond } from '../types/bonds';
import { UserStake, UserStats } from '../types/user';
import { UserERC20 } from '../types/erc20';

const ZERO_BIG_INT = BigInt(0);

const getStatus = (allowedToMints: bigint, availableToMint: bigint, staked: bigint) => {
  if (!allowedToMints) {
    return BondStatus.SUBMITTED;
  } else if (availableToMint) {
    return BondStatus.READY_FOR_MINT;
  } else if (staked) {
    return BondStatus.UNDER_COLLATERAL;
  } else {
    return BondStatus.MINTED;
  }
};

export interface UserSlice {
  userBonds: UserBond[];
  fetchData: (account: string, chain: Chain) => Promise<void>;
  userStats: UserStats;
  fetchUserStats: (account: string, chain: Chain) => Promise<void>;
  userStake: UserStake;
  fetchStake: (account: string, chain: Chain) => Promise<void>;
  mainERC20: UserERC20;
  userERC20: UserERC20[];
  fetchERC20: (account: string, chain: Chain) => Promise<void>;
}

export const createUserSlice = (): SliceCreator<UserSlice> => set => {
  return {
    userBonds: [],
    userERC20: [],
    mainERC20: {
      ...SBC,
      balance: ZERO_BIG_INT,
    },
    userStats: {
      borrowed: ZERO_BIG_INT,
      debt: ZERO_BIG_INT,
      debtUpdateTimestamp: ZERO_BIG_INT,
      nominalAvailable: ZERO_BIG_INT,
      staked: ZERO_BIG_INT,
    },
    userStake: {
      stakedAmount: ZERO_BIG_INT,
      rewardPaid: ZERO_BIG_INT,
      userRewardPerTokenPaid: ZERO_BIG_INT,
      rewardsEarned: ZERO_BIG_INT,
      stakeTimestamp: ZERO_BIG_INT,
      expectedAPY: ZERO_BIG_INT,
    },
    fetchData: async (account, chain) => {
      try {
        const allowedBonds = await Promise.all(
          allBonds.map(async i => {
            const nftContract = getNftContract(chain);

            const allowedToMints = await readContract({
              contract: nftContract,
              method: 'allowedMints',
              params: [account, BigInt(i.tokenId)],
            });

            if (!allowedToMints) return null;

            const stakingAndBorrowingContract = getStakingAndBorrowingContract(chain);

            const staked = await readContract({
              contract: stakingAndBorrowingContract,
              method: 'userNFTs',
              params: [account, addresses[chain.id]!.BOND_NFT, BigInt(i.tokenId)],
            });

            const availableToMint = await readContract({
              contract: nftContract,
              method: 'remainingMints',
              params: [account, BigInt(i.tokenId)],
            });

            const minted = await readContract({
              contract: nftContract,
              method: 'balanceOf',
              params: [account, BigInt(i.tokenId)],
            });

            return {
              ...i,
              allowedToMints,
              availableToMint,
              staked,
              minted,
              status: getStatus(allowedToMints, availableToMint, staked),
            };
          }),
        );

        const filtered = allowedBonds.filter(i => i !== null);

        set(state => {
          state.user.userBonds = filtered;
        });
      } catch (error) {
        console.log(error);
      }
    },
    fetchUserStats: async (account, chain) => {
      const stakingAndBorrowingContract = getStakingAndBorrowingContract(chain);

      const userStats = await readContract({
        contract: stakingAndBorrowingContract,
        method: 'getUserStats',
        params: [account],
      });

      console.log(userStats);

      set(state => {
        state.user.userStats = userStats;
      });
    },
    fetchStake: async (account, chain) => {
      const stableCoinsStakingContract = getStableCoinsStaking(chain);

      const stakers = await readContract({
        contract: stableCoinsStakingContract,
        method: 'stakers',
        params: [account],
      });

      let expectedAPY = ZERO_BIG_INT;

      try {
        expectedAPY = await readContract({
          contract: stableCoinsStakingContract,
          method: 'expectedAPY',
          params: [account],
        });
      } catch {}

      const userStake = {
        stakedAmount: stakers[0],
        rewardPaid: stakers[1],
        userRewardPerTokenPaid: stakers[2],
        rewardsEarned: stakers[3],
        stakeTimestamp: stakers[4],
        expectedAPY,
      };

      set(state => {
        state.user.userStake = userStake;
      });
    },
    fetchERC20: async (account, chain) => {
      const userERC20 = await Promise.all(
        erc20.map(async i => {
          const contract = getContract({
            chain,
            address: i.address[chain.id],
            client: thirdwebClient,
            abi: StableBondCoinsAbi,
          });

          const balance = await readContract({
            contract,
            method: 'balanceOf',
            params: [account],
          });

          return { ...i, balance };
        }),
      );

      set(state => {
        state.user.userERC20 = userERC20;
        state.user.mainERC20 = userERC20[0];
      });
    },
  };
};

export const userSelector = (state: AllSlices) => state.user;
