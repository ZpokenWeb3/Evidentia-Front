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
import { cutString, hashString } from '@/app/lib/string';
import { UserBond } from '@/app/types/bonds';
import { ChartCandlestick, Coins, Hash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

interface UnstakeNftModalProps {
  bond: UserBond;
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const UnstakeNftModal = ({ bond, open, setOpen }: UnstakeNftModalProps) => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();

  const [amount, setAmount] = useState('');

  useEffect(() => {}, [amount, account]);

  useEffect(() => {
    if (!account || !chain) return;

    void (async () => {})();
  }, [account, chain]);

  const stake = async () => {
    const contracts = addresses[chain!.id];
    if (!chain || !contracts) return;

    const { BOND_NFT, NFT_STAKING_AND_BORROWING } = contracts;

    try {
      const stakeContract = getContract({
        chain: chain,
        address: NFT_STAKING_AND_BORROWING,
        client: thirdwebClient,
      });

      const stakeTx = prepareContractCall({
        contract: stakeContract,
        method: 'function unstakeNFT(address nftAddress, uint256 tokenId, uint256 amount)',
        params: [BOND_NFT, BigInt(hashString(bond.ISIN)), BigInt(amount)],
      });

      const { transactionHash } = await mutateAsync(stakeTx);

      await waitForReceipt({
        client: thirdwebClient,
        chain,
        transactionHash,
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open)}>
      <DialogContent className='w-[438px]'>
        <DialogHeader className='flex flex-row items-center gap-2'>
          <div>
            <ChartCandlestick className='size-6 stroke-2 text-icon' />
          </div>
          <DialogTitle className='text-xl font-medium'>Unstake Bond NFT</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Token ID</p>
            <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
              <div>
                <Hash className='w-5 stroke-2 text-input-icon' />
              </div>
              <p className='break-all text-base font-medium text-[#161822]'>
                {cutString(BigInt(hashString(bond.ISIN)).toString(), 7, 7)}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Amount</p>
            <InputIcon
              placeholder='Enter amount'
              icon={<Coins className='size-5 stroke-2 text-input-icon' />}
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button className='w-[136px]' variant='destructive' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className='w-[136px]' onClick={() => void stake()}>
            Stake
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
