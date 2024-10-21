'use client';

import { addresses } from '@/app/config/addresses';
import { thirdwebClient } from '@/app/config/thirdweb';
import { formatNumber } from '@/app/lib/formatter';
import { cutString } from '@/app/lib/string';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { BookUser, Hash, Wallet } from 'lucide-react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { BondModalProps } from './types';
import { DialogWrapper } from '../components/dialog-wrapper';

export const MintModal = ({ bond, open, toggleOpen }: BondModalProps) => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();
  const { fetchData } = useStore(userSelector);

  const mint = async () => {
    if (!chain || !account) return;

    const tx = prepareContractCall({
      contract: getContract({
        chain,
        address: addresses[chain.id]!.BOND_NFT,
        client: thirdwebClient,
      }),
      method: 'function mint(uint256 tokenId, uint256 amount, bytes data)',
      params: [BigInt(bond.tokenId), bond.availableToMint, '0x'],
    });

    const { transactionHash } = await mutateAsync(tx);

    await waitForReceipt({
      client: thirdwebClient,
      chain,
      transactionHash,
    });

    await fetchData(account.address, chain);
  };

  return (
    <DialogWrapper
      open={open}
      toggleOpen={toggleOpen}
      handleTx={mint}
      disabled={!Boolean(bond.availableToMint)}
      title='Mint Bond NFT'
    >
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
              {formatNumber(bond.availableToMint)}
            </p>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};
