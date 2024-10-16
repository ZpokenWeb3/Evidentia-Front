'use client';

import { DataTable } from '@/app/components/data-table';
import { allLoansHeader } from './constants';
import { useStore } from '@/app/state';
import { useActiveAccount, useActiveWalletChain } from 'thirdweb/react';
import { userSelector } from '@/app/state/user';
import { Wallet } from 'lucide-react';
import { formatAmount } from '@/app/lib/formatter';
import { LoanTableActions } from './loan-table-actions';

export const AllLoans = () => {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { userStats, mainERC20 } = useStore(userSelector);

  return (
    <DataTable
      headers={allLoansHeader}
      data={[
        {
          currency: (
            <div className='flex items-center gap-2'>
              <p>{mainERC20.symbol}</p>
              <div
                tabIndex={1}
                role='button'
                onClick={() => {
                  void (async () => {
                    if (account && chain && account.watchAsset) {
                      await account.watchAsset({
                        type: 'ERC20',
                        options: {
                          address: mainERC20.address[chain.id]!,
                          symbol: mainERC20.symbol,
                          decimals: mainERC20.decimals,
                        },
                      });
                    }
                  })();
                }}
              >
                <Wallet className='size-5 cursor-pointer stroke-2 text-input-icon' />
              </div>
            </div>
          ),
          weeklyInterest: '0',
          borrowed: formatAmount({
            amount: userStats.borrowed,
            exponent: mainERC20.decimals,
            commas: true,
          }),
          debt: formatAmount({
            amount: userStats.debt,
            exponent: mainERC20.decimals,
            commas: true,
          }),
          action: <LoanTableActions />,
        },
      ]}
    />
  );
};
