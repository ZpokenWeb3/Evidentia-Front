'use client';

import { useStore } from '../state';
import { userSelector } from '../state/user';
import { bondOverviews } from './constants';
import { OverviewCards } from './shared/overview-cards';

export const BondsData = () => {
  const { userBonds } = useStore(userSelector);

  console.log({ userBonds });

  return (
    <OverviewCards
      title='Bonds Overview'
      content={bondOverviews}
      contentData={{
        mint: `${userBonds.reduce((acc, i) => acc + i.availableToMint, BigInt(0))}`,
        minted: `${userBonds.reduce((acc, i) => acc + i.minted, BigInt(0))}`,
        collateral: `${userBonds.reduce((acc, i) => acc + i.staked, BigInt(0))}`,
      }}
    />
  );
};
