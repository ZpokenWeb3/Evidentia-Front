'use client';

import { useActiveWalletChain, useSendTransaction } from 'thirdweb/react';
import { thirdwebClient } from '../config/thirdweb';
import { SelectIcon } from '../components/select-icon';
import { Coins } from 'lucide-react';
import { allBonds } from '../config/bonds';
import { useState } from 'react';
import { InputIcon } from '../components/input-icon';
import { Button } from '../components/ui/button';
import { getContract, prepareContractCall, waitForReceipt } from 'thirdweb';
import { addresses } from '../config/addresses';
import { useToast } from '../hooks/use-toast';
import { Connect } from '../components/connect';

export default function Admin() {
  const chain = useActiveWalletChain();
  const { mutateAsync } = useSendTransaction();
  const { toast } = useToast();

  const [bond, setBond] = useState('');
  const [user, setUser] = useState('');
  const [amount, setAmount] = useState('');

  const allow = async () => {
    if (!chain) return;

    const transaction = prepareContractCall({
      contract: getContract({
        chain,
        address: addresses[chain.id]!.BOND_NFT,
        client: thirdwebClient,
      }),
      method: 'function setAllowedMints(address user, uint256 tokenId, uint256 amount)',
      params: [user, BigInt(bond), BigInt(amount)],
      gas: BigInt(2_000_000),
    });

    const { transactionHash } = await mutateAsync(transaction);

    const receipt = await waitForReceipt({
      client: thirdwebClient,
      chain,
      transactionHash,
    });

    toast({
      title: receipt.status,
      variant: 'default',
    });
  };

  return (
    <div className='flex w-full flex-col'>
      <header className='flex min-h-[60px] items-center justify-between bg-header pl-4 pr-[30px]'>
        <h2 className='text-left text-2xl font-semibold leading-7'>Admin Panel</h2>
        <Connect />
      </header>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex w-[400px] flex-col gap-4'>
          <div className='flex flex-col'>
            <p className='pb-10 text-3xl'>Allow NFT</p>
            <form
              className='flex flex-col gap-4'
              onSubmit={e => {
                e.preventDefault();
                void allow();
              }}
            >
              <SelectIcon
                label='Select bond'
                icon={<Coins />}
                options={allBonds.map(i => {
                  return {
                    label: i.ISIN,
                    value: i.tokenId,
                  };
                })}
                select={{
                  value: bond,
                  onValueChange: val => setBond(val),
                }}
              />
              <InputIcon
                label='Enter user address'
                icon={<Coins />}
                value={user}
                onChange={e => {
                  setUser(e.target.value);
                }}
              />
              <InputIcon
                label='Enter amount'
                icon={<Coins />}
                value={amount}
                onChange={e => {
                  setAmount(e.target.value);
                }}
              />
              <Button disabled={!bond || !amount || !user}>Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
