'use client';

import { InputIcon } from '@/app/components/input-icon';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { addresses } from '@/app/config/addresses';
import { thirdwebClient } from '@/app/config/thirdweb';
import { formatAmount } from '@/app/lib/formatter';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { parseUnits } from 'ethers/lib/utils';
import { ChartCandlestick, Coins, Wallet } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

interface RepayModalProps {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

export const RepayModal = ({ open, toggleOpen }: RepayModalProps) => {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync } = useSendTransaction();
  const { mainERC20, userStats, fetchUserStats } = useStore(userSelector);

  const [amount, setAmount] = useState('');

  const validationErrors = useMemo(() => {
    return mainERC20.balance < parseUnits(amount || '0', mainERC20.decimals).toBigInt();
  }, [amount, mainERC20]);

  console.log({ validationErrors });

  const repay = async () => {
    const contracts = addresses[chain!.id];
    if (!chain || !contracts || !account) return;
    try {
      const { NFT_STAKING_AND_BORROWING, STABLE_BOND_COINS } = contracts;

      const value = parseUnits(amount, mainERC20.decimals).toBigInt();
      // Approve erc20 for NFT_STAKING_AND_BORROWING contract
      const approveTx = prepareContractCall({
        contract: getContract({
          chain,
          address: STABLE_BOND_COINS,
          client: thirdwebClient,
        }),
        method: 'function approve(address spender, uint256 value)',
        params: [NFT_STAKING_AND_BORROWING, value],
      });

      const { transactionHash: approveHash } = await mutateAsync(approveTx);

      await waitForReceipt({
        client: thirdwebClient,
        chain,
        transactionHash: approveHash,
      });

      // Repay
      const repayTx = prepareContractCall({
        contract: getContract({
          chain,
          address: NFT_STAKING_AND_BORROWING,
          client: thirdwebClient,
        }),
        method: 'function repay(uint256 amount)',
        params: [value],
      });

      const { transactionHash } = await mutateAsync(repayTx);

      await waitForReceipt({
        client: thirdwebClient,
        chain: chain,
        transactionHash,
      });

      await fetchUserStats(account.address, chain);

      toggleOpen(false);
    } catch (error) {
      console.log('Repay:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => toggleOpen(open)}>
      <DialogContent className='w-[438px]'>
        <DialogHeader className='flex flex-row items-center gap-2'>
          <div>
            <ChartCandlestick className='size-6 stroke-2 text-icon' />
          </div>
          <DialogTitle className='text-xl font-medium'>Repay</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Amount</p>
            <InputIcon
              placeholder='Enter amount of repay'
              icon={<Coins className='size-5 stroke-2 text-input-icon' />}
              value={amount}
              onChange={e => {
                const val = e.target.value;
                if (Number(val) < 0 || val.includes('e')) return;
                setAmount(val);
              }}
              type='number'
              maxValue={{
                label: `Debt: ${formatAmount({ amount: userStats.debt, exponent: mainERC20.decimals, commas: true })}`,
                onClick: () =>
                  setAmount(
                    formatAmount({
                      amount: userStats.debt,
                      exponent: mainERC20.decimals,
                      commas: false,
                      decimalPlaces: mainERC20.decimals,
                    }),
                  ),
              }}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>User Balance</p>
            <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
              <div>
                <Wallet className='w-5 stroke-2 text-input-icon' />
              </div>
              <p className='break-all text-base font-medium text-[#161822]'>
                {`${formatAmount({
                  amount: mainERC20.balance,
                  exponent: mainERC20.decimals,
                  commas: true,
                })} ${mainERC20.symbol}`}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className='w-[136px]' variant='destructive' onClick={() => toggleOpen(false)}>
            Cancel
          </Button>
          <Button
            className='w-[136px]'
            onClick={() => void repay()}
            disabled={!amount || validationErrors}
          >
            Repay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
