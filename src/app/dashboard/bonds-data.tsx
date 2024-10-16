'use client';

import { formatNumber } from '../lib/formatter';
import { sumByKey } from '../lib/math';
import { useStore } from '../state';
import { userSelector } from '../state/user';
import { bondOverviews } from './constants';
import { OverviewCards } from './shared/overview-cards';

export const BondsData = () => {
  const { userBonds } = useStore(userSelector);

  return (
    <OverviewCards
      title='Bonds Overview'
      content={bondOverviews}
      contentData={{
        mint: `${formatNumber(sumByKey(userBonds, 'availableToMint'))}`,
        minted: `${formatNumber(sumByKey(userBonds, 'minted'))}`,
        collateral: `${formatNumber(sumByKey(userBonds, 'staked'))}`,
      }}
    />
  );
};
