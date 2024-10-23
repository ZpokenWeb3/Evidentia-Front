'use client';

import { InputIcon } from '@/app/components/input-icon';
import { addresses } from '@/app/config/addresses';
import { thirdwebClient } from '@/app/config/thirdweb';
import { formatNumber } from '@/app/lib/formatter';
import { cutString } from '@/app/lib/string';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { Coins, Hash } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { BondModalProps } from './types';
import { DialogWrapper } from '../components/dialog-wrapper';

export const DepositModal = ({ bond, open, toggleOpen }: BondModalProps) => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();
  const { fetchData } = useStore(userSelector);

  const [amount, setAmount] = useState('');

  const validationErrors = useMemo(() => {
    return bond.availableToDeposit < BigInt(amount);
  }, [amount, bond]);

  const deposit = async () => {
    const contracts = addresses[chain!.id];
    if (!chain || !contracts || !account) return;

    const { BOND_NFT, NFT_STAKING_AND_BORROWING } = contracts;

    // Approve nfts for NFT_STAKING_AND_BORROWING contract
    const approveTx = prepareContractCall({
      contract: getContract({
        chain: chain,
        address: BOND_NFT,
        client: thirdwebClient,
      }),
      method: 'function setApprovalForAll(address operator, bool approved)',
      params: [NFT_STAKING_AND_BORROWING, true],
    });

    const { transactionHash: approveHash } = await mutateAsync(approveTx);

    await waitForReceipt({
      client: thirdwebClient,
      chain,
      transactionHash: approveHash,
    });

    // Stake NFT
    const stakeTx = prepareContractCall({
      contract: getContract({
        chain: chain,
        address: NFT_STAKING_AND_BORROWING,
        client: thirdwebClient,
      }),
      method: 'function stakeNFT(address nftAddress, uint256 tokenId, uint256 amount)',
      params: [BOND_NFT, BigInt(bond.tokenId), BigInt(amount)],
      gas: BigInt(2_000_000),
    });

    const { transactionHash } = await mutateAsync(stakeTx);

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
      handleTx={deposit}
      disabled={!Number(amount) || validationErrors}
      title='Deposit Bond NFT'
    >
      <div className='flex flex-col gap-4'>
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
        <div className='flex flex-col gap-1'>
          <p className='text-base font-semibold'>Amount</p>
          <InputIcon
            placeholder='Enter amount'
            icon={<Coins className='size-5 stroke-2 text-input-icon' />}
            value={amount}
            onChange={e => {
              const val = e.target.value;
              if (Number(val) < 0 || val.includes('.') || val.includes('e')) return;
              setAmount(val);
            }}
            type='number'
            maxValue={{
              label: `Available to Deposit: ${formatNumber(bond.availableToDeposit)}`,
              onClick: () => setAmount(bond.availableToDeposit.toString()),
            }}
          />
        </div>
      </div>
    </DialogWrapper>
  );
};
