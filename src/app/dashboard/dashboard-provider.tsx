'use client';

import { useEffect } from 'react';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import { useStore } from '../state';
import { userSelector } from '../state/user';
import { Header } from '../components/header';

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { fetchData, fetchUserStats, fetchStake, fetchERC20 } = useStore(userSelector);

  useEffect(() => {
    if (!chain || !account) return;
    void fetchData(account.address, chain);
    void fetchUserStats(account.address, chain);
    void fetchStake(account.address, chain);
    void fetchERC20(account.address, chain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, account]);
  return (
    <div className='flex grow flex-col'>
      <Header />
      <div className='grow overflow-y-auto px-5 pt-4'>{children}</div>
    </div>
  );
};
