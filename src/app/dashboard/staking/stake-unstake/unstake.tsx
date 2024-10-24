'use client';

import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { InputIcon } from '@/app/components/input-icon';
import { Button } from '@/app/components/ui/button';
import { addresses } from '@/app/config/addresses';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { Coins } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { thirdwebClient } from '@/app/config/thirdweb';
import { parseUnits } from 'ethers/lib/utils';
import { formatAmount } from '@/app/lib/formatter';
import { Loader } from '@/app/components/loader';

export const Unstake = () => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();

  const { userStake, mainERC20, fetchStake, fetchERC20 } = useStore(userSelector);
  const [amount, setAmount] = useState('');
  const [pending, setPending] = useState<boolean>(false);

  const validationErrors = useMemo(() => {
    return userStake.stakedAmount < parseUnits(amount || '0', mainERC20.decimals).toBigInt();
  }, [amount, userStake, mainERC20]);

  const unstake = async () => {
    if (!account || !chain) return;
    try {
      const contracts = addresses[chain.id]!;
      setPending(true);

      const { STABLE_COINS_STAKING } = contracts;

      const contract = getContract({
        chain: chain,
        address: STABLE_COINS_STAKING,
        client: thirdwebClient,
      });

      const tx = prepareContractCall({
        contract,
        method: 'function withdraw(uint256 amount)',
        params: [parseUnits(amount, mainERC20.decimals).toBigInt()],
        gas: BigInt(2_000_000),
      });

      const { transactionHash } = await mutateAsync(tx);

      await waitForReceipt({
        client: thirdwebClient,
        chain: chain,
        transactionHash,
      });

      await fetchStake(account.address, chain);
      await fetchERC20(account.address, chain);
    } catch (error) {
      console.log(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <form
        className='flex flex-col gap-[18px]'
        onSubmit={e => {
          e.preventDefault();
          void unstake();
        }}
      >
        <InputIcon
          icon={<Coins className='size-5 stroke-2 text-input-icon' />}
          placeholder='Enter amount'
          value={amount}
          onChange={e => {
            const val = e.target.value;
            if (Number(val) < 0 || val.includes('e')) return;
            setAmount(val);
          }}
          type='number'
          maxValue={{
            onClick: e => {
              e.preventDefault();
              setAmount(
                formatAmount({
                  amount: userStake.stakedAmount,
                  exponent: mainERC20.decimals,
                  commas: false,
                  decimalPlaces: mainERC20.decimals,
                }),
              );
            },
          }}
        />
        <Button
          variant={pending ? 'destructive' : 'default'}
          disabled={!Number(amount) || pending || validationErrors}
        >
          {!pending ? (
            'Unstake'
          ) : (
            <div className='size-8'>
              <Loader />
            </div>
          )}
        </Button>
      </form>
      <div className='flex flex-col gap-[6px]'>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>Your Staked Balance</p>
          <p className='text-[12px] font-normal leading-[18px]'>
            {`${formatAmount({
              amount: userStake.stakedAmount,
              exponent: mainERC20.decimals,
              commas: true,
            })} ${mainERC20.symbol}`}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>Your Balance</p>
          <p className='text-[12px] font-normal leading-[18px]'>
            {`${formatAmount({
              amount: mainERC20.balance,
              exponent: mainERC20.decimals,
              commas: true,
            })} ${mainERC20.symbol}`}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>Your Reward Amount</p>
          <p className='text-[12px] font-normal leading-[18px]'>
            {`${formatAmount({
              amount: userStake.rewardsEarned,
              exponent: mainERC20.decimals,
              commas: true,
            })} ${mainERC20.symbol}`}
          </p>
        </div>
        {/* <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>Next Reward Yield</p>
          <p className='text-[12px] font-normal leading-[18px]'>0.654%</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>ROI (5 day Rate)</p>
          <p className='text-[12px] font-normal leading-[18px]'>8,4788%</p>
        </div> */}
      </div>
    </div>
  );
};
