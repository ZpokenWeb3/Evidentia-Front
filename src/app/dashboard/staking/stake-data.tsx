'use client';

import { useStore } from '@/app/state';
import { OverviewCards } from '../shared/overview-cards';
import { stakeOverviews } from './constants';
import { userSelector } from '@/app/state/user';
import { formatAmount } from '@/app/lib/formatter';
import { calculateAPY, calculateEstimatedEarnings } from './helpers';

export const StakeData = () => {
  const { userStake, mainERC20 } = useStore(userSelector);

  return (
    <OverviewCards
      title='Staking  Overview'
      content={stakeOverviews}
      contentData={{
        totalStaked: `${formatAmount({
          amount: userStake.stakedAmount,
          exponent: mainERC20.decimals,
          commas: true,
        })} ${mainERC20.symbol}`,
        apy: `${calculateAPY(userStake.expectedAPY).toFixed(2)}%`,
        yearEarnings: `${calculateEstimatedEarnings(
          userStake.expectedAPY,
          userStake.stakedAmount,
          mainERC20.decimals,
        ).toFormat(2, {
          decimalSeparator: '.',
          groupSeparator: ',',
          groupSize: 3,
        })} ${mainERC20.symbol}`,
      }}
    />
  );
};
