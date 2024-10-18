import { getStableCoinsStaking, getStakingAndBorrowingContract } from '@/app/lib/contracts';
import { fromBaseUnitAmount } from '@/app/lib/formatter';
import BigNumber from 'bignumber.js';
import { Chain, readContract } from 'thirdweb';

export const calculateAPY = (expectedAPY: bigint) => {
  console.log({ expectedAPY });

  return BigNumber(expectedAPY.toString()).div(BigNumber(100));
};

export const calculateEstimatedEarnings = (
  expectedAPY: bigint,
  stakedAmount: bigint,
  decimals: number,
) => {
  const stakedAmountFormatted = fromBaseUnitAmount(stakedAmount, decimals);
  const apyPercentage = calculateAPY(expectedAPY);

  return stakedAmountFormatted.multipliedBy(apyPercentage).div(BigNumber(100));
};

export const calculateNextRewardYield = async (chain: Chain, decimals: number) => {
  try {
    const stakinContract = getStableCoinsStaking(chain);
    const rewardContract = getStakingAndBorrowingContract(chain);

    const totalStaked = await readContract({
      contract: stakinContract,
      method: 'totalStaked',
    });
    const totalStakedFormatted = fromBaseUnitAmount(totalStaked, decimals);

    const rewardAmount = await readContract({
      contract: rewardContract,
      method: 'getRewardAmount',
    });

    const rewardAmountFormatted = fromBaseUnitAmount(rewardAmount, decimals);

    return rewardAmountFormatted.div(totalStakedFormatted).multipliedBy(BigNumber(100));
  } catch (error) {
    console.log('calculateNextRewardYield', error);

    return BigNumber(0);
  }
};

export const calculateFiveDayROI = async (chain: Chain, decimals: number) => {
  try {
    const nextRewardYield = await calculateNextRewardYield(chain, decimals);

    // Assume that the reward cycle is daily to calculate the daily yield
    const dailyYield = nextRewardYield.div(BigNumber(100)); // Convert percentage to decimal

    const fiveDayROI = (Math.pow(1 + dailyYield.toNumber(), 5) - 1) * 100;

    return fiveDayROI;
  } catch {
    return 0;
  }
};
