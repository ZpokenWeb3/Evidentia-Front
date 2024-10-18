'use client';

import { useActiveAccount, useActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { InputIcon } from '@/app/components/input-icon';
import { Button } from '@/app/components/ui/button';
import { addresses } from '@/app/config/addresses';
import { useStore } from '@/app/state';
import { userSelector } from '@/app/state/user';
import { Coins } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { thirdwebClient } from '@/app/config/thirdweb';
import { parseUnits } from 'ethers/lib/utils';
import { formatAmount } from '@/app/lib/formatter';
import { calculateFiveDayROI, calculateNextRewardYield } from '../helpers';

export const Stake = () => {
  const chain = useActiveWalletChain();
  const account = useActiveAccount();
  const { mutateAsync } = useSendTransaction();

  const { userStake, mainERC20, fetchStake, fetchERC20 } = useStore(userSelector);
  const [amount, setAmount] = useState('');
  const [nextRewardYield, setNextRewardYield] = useState('0.00');
  const [roi, setRoi] = useState('0.00');

  useEffect(() => {
    if (!chain) return;

    void (async () => {
      setNextRewardYield((await calculateNextRewardYield(chain, mainERC20.decimals)).toFixed(2));

      setRoi((await calculateFiveDayROI(chain, mainERC20.decimals)).toFixed(4));
    })();
  }, [chain, mainERC20]);

  const stake = async () => {
    if (!account || !chain) return;
    try {
      const contracts = addresses[chain.id]!;

      const { STABLE_COINS_STAKING, STABLE_BOND_COINS } = contracts;
      const value = parseUnits(amount, mainERC20.decimals).toBigInt();

      // Approve ERC20 for STABLE_COINS_STAKING contract

      const nftContract = getContract({
        chain: chain,
        address: STABLE_BOND_COINS,
        client: thirdwebClient,
      });

      const approveTx = prepareContractCall({
        contract: nftContract,
        method: 'function approve(address spender, uint256 value)',
        params: [STABLE_COINS_STAKING, value],
      });

      const { transactionHash: approveHash } = await mutateAsync(approveTx);

      await waitForReceipt({
        client: thirdwebClient,
        chain,
        transactionHash: approveHash,
      });

      // Stake
      const contract = getContract({
        chain: chain,
        address: STABLE_COINS_STAKING,
        client: thirdwebClient,
      });

      const tx = prepareContractCall({
        contract,
        method: 'function stake(uint256 amount)',
        params: [value],
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
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <form
        className='flex flex-col gap-[18px]'
        onSubmit={e => {
          e.preventDefault();
          void stake();
        }}
      >
        <InputIcon
          icon={<Coins className='size-5 stroke-2 text-input-icon' />}
          label='Amount of Staking'
          placeholder='Enter amount'
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <Button>Stake</Button>
      </form>
      <div className='flex flex-col gap-[6px]'>
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
          <p className='text-[12px] font-normal leading-[18px]'>Your Reward Amount</p>
          <p className='text-[12px] font-normal leading-[18px]'>
            {`${formatAmount({
              amount: userStake.rewardsEarned,
              exponent: mainERC20.decimals,
              commas: true,
            })} ${mainERC20.symbol}`}
          </p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>Next Reward Yield</p>
          <p className='text-[12px] font-normal leading-[18px]'>{nextRewardYield}%</p>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-[12px] font-normal leading-[18px]'>ROI (5 day Rate)</p>
          <p className='text-[12px] font-normal leading-[18px]'>{roi}%</p>
        </div>
      </div>
    </div>
  );
};
