'use client';

import { OverviewCards } from '../shared/overview-cards';
import { loansOverviews } from './constants';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { formatAmount } from '@/app/lib/formatter';

export const LoansData = () => {
  const { userStats, mainERC20 } = useStore(userSelector);

  return (
    <OverviewCards
      title='Loans Overview'
      content={loansOverviews}
      contentData={{
        totalDebt: `${formatAmount({
          amount: userStats.debt,
          exponent: mainERC20.decimals,
          commas: true,
        })} ${mainERC20.symbol}`,
        totalBorrowed: `${formatAmount({
          amount: userStats.borrowed,
          exponent: mainERC20.decimals,
          commas: true,
        })} ${mainERC20.symbol}`,
        totalWeeklyInterest: '0',
      }}
      className='grid grid-cols-1 gap-3 md:grid-cols-3'
    />
  );
};
