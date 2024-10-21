'use client';

import { InputIcon } from '@/app/components/input-icon';
import { Button, buttonVariants } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { addresses } from '@/app/config/addresses';
import { thirdwebClient } from '@/app/config/thirdweb';
import { getStakingAndBorrowingContract } from '@/app/lib/contracts';
import { cn } from '@/app/lib/utils';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { ChartCandlestick, Coins } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getContract, prepareContractCall, readContract, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

export const BorrowModal = () => {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync } = useSendTransaction();
  const { mainERC20, fetchUserStats, fetchERC20 } = useStore(userSelector);

  const [amount, setAmount] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [collateral, setCollateral] = useState<bigint>(BigInt(0));

  const fetchAvailableToBorrow = async () => {
    try {
      const contract = getStakingAndBorrowingContract(chain!);

      const userAvailableToBorrow = await readContract({
        contract,
        method: 'userAvailableToBorrow',
        params: [account!.address],
      });

      setCollateral(userAvailableToBorrow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!account || !chain) return;

    void fetchAvailableToBorrow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chain]);

  const borrow = async () => {
    if (!account || !chain) return;
    try {
      const contracts = addresses[chain.id]!;

      const { NFT_STAKING_AND_BORROWING } = contracts;

      const tx = prepareContractCall({
        contract: getContract({
          chain,
          address: NFT_STAKING_AND_BORROWING,
          client: thirdwebClient,
        }),
        method: 'function borrow(uint256 amount)',
        params: [parseUnits(amount, 6).toBigInt()],
      });

      const { transactionHash } = await mutateAsync(tx);

      await waitForReceipt({
        client: thirdwebClient,
        chain: chain,
        transactionHash,
      });

      await fetchUserStats(account.address, chain);
      await fetchAvailableToBorrow();
      await fetchERC20(account.address, chain);
      setOpen(false);
    } catch (error) {
      console.log('Borrow', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger className={cn(buttonVariants({ variant: 'secondary' }), 'w-[151px]')}>
        Borrow
      </DialogTrigger>
      <DialogContent className='w-[438px]'>
        <DialogHeader className='flex flex-row items-center gap-2'>
          <div>
            <ChartCandlestick className='size-6 stroke-2 text-icon' />
          </div>
          <DialogTitle className='text-xl font-medium'>Borrow</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Amount</p>
            <InputIcon
              placeholder='Enter amount of borrow'
              icon={<Coins className='size-5 stroke-2 text-input-icon' />}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <p>
            Max to Borrow:{' '}
            {`${formatUnits(collateral.toString(), mainERC20.decimals)} ${mainERC20.symbol}`}
          </p>
        </div>
        <DialogFooter>
          <Button className='w-[136px]' variant='destructive' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className='w-[136px]' onClick={() => void borrow()}>
            Borrow
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
