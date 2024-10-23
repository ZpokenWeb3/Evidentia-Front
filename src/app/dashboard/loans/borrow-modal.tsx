'use client';

import { DialogWrapper } from '@/app/components/dialog-wrapper';
import { InputIcon } from '@/app/components/input-icon';
import { addresses } from '@/app/config/addresses';
import { thirdwebClient } from '@/app/config/thirdweb';
import { formatAmount } from '@/app/lib/formatter';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { parseUnits } from 'ethers/lib/utils';
import { Coins } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';

export const BorrowModal = ({
  open,
  toggleOpen,
}: {
  open: boolean;
  toggleOpen: (val: boolean) => void;
}) => {
  const account = useActiveAccount();
  const chain = useActiveWalletChain();
  const { mutateAsync } = useSendTransaction();
  const { mainERC20, userStats, fetchUserStats, fetchERC20 } = useStore(userSelector);

  const [amount, setAmount] = useState('');

  const validationErrors = useMemo(() => {
    return userStats.availableToBorrow < parseUnits(amount || '0', mainERC20.decimals).toBigInt();
  }, [amount, mainERC20, userStats]);

  const borrow = async () => {
    if (!account || !chain) return;

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
      gas: BigInt(2_000_000),
    });

    const { transactionHash } = await mutateAsync(tx);

    await waitForReceipt({
      client: thirdwebClient,
      chain: chain,
      transactionHash,
    });

    await fetchUserStats(account.address, chain);
    await fetchERC20(account.address, chain);
  };

  return (
    <DialogWrapper
      open={open}
      toggleOpen={toggleOpen}
      handleTx={borrow}
      disabled={!Number(amount) || validationErrors}
      title='Borrow'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <p className='text-base font-semibold'>Amount</p>
          <InputIcon
            placeholder='Enter amount of borrow'
            icon={<Coins className='size-5 stroke-2 text-input-icon' />}
            value={amount}
            onChange={e => {
              const val = e.target.value;
              if (Number(val) < 0 || val.includes('e')) return;
              setAmount(val);
            }}
            type='number'
            maxValue={{
              label: `Max to Borrow: ${formatAmount({ amount: userStats.availableToBorrow, exponent: mainERC20.decimals, commas: true })}`,
              onClick: () =>
                setAmount(
                  formatAmount({
                    amount: userStats.availableToBorrow,
                    exponent: mainERC20.decimals,
                    commas: false,
                    decimalPlaces: mainERC20.decimals,
                  }),
                ),
            }}
          />
        </div>
      </div>
    </DialogWrapper>
  );
};
