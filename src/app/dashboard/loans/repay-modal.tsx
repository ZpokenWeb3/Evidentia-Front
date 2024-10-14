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
import { cn } from '@/app/lib/utils';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { parseUnits } from 'ethers/lib/utils';
import { ChartCandlestick, Coins, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { estimateGasCost, getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

export const RepayModal = () => {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync } = useSendTransaction();
  const { fetchUserStats } = useStore(userSelector);

  const [amount, setAmount] = useState('');
  const [gas, setGas] = useState('0.00');
  const [open, setOpen] = useState<boolean>(false);

  const getRepayTx = () => {
    const contracts = addresses[chain!.id]!;

    const { NFT_STAKING_AND_BORROWING } = contracts;

    const contract = getContract({
      chain: chain!,
      address: NFT_STAKING_AND_BORROWING,
      client: thirdwebClient,
    });

    return prepareContractCall({
      contract,
      method: 'function repay(uint256 amount)',
      params: [parseUnits(amount, 6).toBigInt()],
      gas: BigInt(2_000_000),
    });
  };

  useEffect(() => {
    void (async () => {
      if (!chain || !account || !amount) return;

      try {
        const transaction = getRepayTx();

        const gasCost = await estimateGasCost({
          transaction,
          from: account.address,
        });

        setGas(gasCost.ether);
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, account, amount]);

  const repay = async () => {
    const contracts = addresses[chain!.id];
    if (!chain || !contracts || !account) return;
    try {
      const { NFT_STAKING_AND_BORROWING, STABLE_BOND_COINS } = contracts;

      // Approve erc20 for NFT_STAKING_AND_BORROWING contract
      const ercContract = getContract({
        chain,
        address: STABLE_BOND_COINS,
        client: thirdwebClient,
      });

      const approveTx = prepareContractCall({
        contract: ercContract,
        method: 'function approve(address spender, uint256 value)',
        params: [NFT_STAKING_AND_BORROWING, parseUnits(amount, 6).toBigInt()],
      });

      const { transactionHash: approveHash } = await mutateAsync(approveTx);

      await waitForReceipt({
        client: thirdwebClient,
        chain,
        transactionHash: approveHash,
      });

      //Repay
      const { transactionHash } = await mutateAsync(getRepayTx());

      await waitForReceipt({
        client: thirdwebClient,
        chain: chain,
        transactionHash,
      });

      await fetchUserStats(account.address, chain);

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogTrigger className={cn(buttonVariants({ variant: 'destructive' }), 'w-[151px]')}>
        Repay
      </DialogTrigger>
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
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Transaction Fee</p>
            <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
              <div>
                <Newspaper className='w-5 stroke-2 text-input-icon' />
              </div>
              <p className='break-all text-base font-medium text-[#161822]'>{gas} XRP</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className='w-[136px]' variant='destructive' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className='w-[136px]' onClick={() => void repay()}>
            Repay
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
