'use client';

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
import { cutString } from '@/app/lib/string';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { UserBond } from '@/app/types/bonds';
import { BookUser, ChartCandlestick, Hash, Wallet } from 'lucide-react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

interface MintModalProps {
  bond: UserBond;
  open: boolean;
  toggleOpen: (val: boolean) => void;
}

export const MintModal = ({ bond, open, toggleOpen }: MintModalProps) => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();
  const { fetchData } = useStore(userSelector);

  const mint = async () => {
    if (!chain || !account) return;

    try {
      const transaction = prepareContractCall({
        contract: getContract({
          chain,
          address: addresses[chain.id]!.BOND_NFT,
          client: thirdwebClient,
        }),
        method: 'function mint(uint256 tokenId, uint256 amount, bytes data)',
        params: [BigInt(bond.tokenId), bond.availableToMint, '0x'],
      });

      const { transactionHash } = await mutateAsync(transaction);

      await waitForReceipt({
        client: thirdwebClient,
        chain,
        transactionHash,
      });

      await fetchData(account.address, chain);
      toggleOpen(false);
    } catch (error) {
      console.log('Mint:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => toggleOpen(open)}>
      <DialogContent className='w-[438px]'>
        <DialogHeader className='flex flex-row items-center gap-2'>
          <div>
            <ChartCandlestick className='size-6 stroke-2 text-icon' />
          </div>
          <DialogTitle className='text-xl font-medium'>Mint</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          {chain && chain.blockExplorers && chain.blockExplorers[0] && (
            <div className='flex flex-col gap-2'>
              <p className='text-base font-semibold'>Contract Address</p>
              <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
                <div>
                  <BookUser className='w-5 stroke-2 text-input-icon' />
                </div>
                <a
                  href={`${chain.blockExplorers[0].url}/address/${addresses[chain.id]?.BOND_NFT}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='break-all text-base font-medium text-[#161822] underline'
                >
                  {cutString((addresses[chain.id]?.BOND_NFT as string) ?? '', 7, 7)}
                </a>
              </div>
            </div>
          )}
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Token ID</p>
            <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
              <div>
                <Hash className='w-5 stroke-2 text-input-icon' />
              </div>
              <p className='break-all text-base font-medium text-[#161822]'>
                {cutString(bond.tokenId, 7, 7)}
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-semibold'>Available To Mint</p>
            <div className='flex items-center gap-3 rounded-lg border border-input-border px-3 py-[10px]'>
              <div>
                <Wallet className='w-5 stroke-2 text-input-icon' />
              </div>
              <p className='break-all text-base font-medium text-[#161822]'>
                {bond.availableToMint.toString()}
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
            onClick={() => void mint()}
            disabled={!Boolean(bond.availableToMint)}
          >
            Mint
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
