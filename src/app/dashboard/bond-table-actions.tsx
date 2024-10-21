'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { UserBond } from '@/app/types/bonds';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { DepositModal } from './deposit-modal';
import { MintModal } from './mint-modal';
import { BondModals } from './types';
import { WithdrawModal } from './withdraw-modal';

interface TableActionProps {
  bond: UserBond;
}

export const BondTableActions = ({ bond }: TableActionProps) => {
  const [openPopover, togglePopover] = useState<boolean>(false);
  const [openModals, toggleModals] = useState<Record<BondModals, boolean>>({
    [BondModals.MINT]: false,
    [BondModals.DEPOSIT]: false,
    [BondModals.WITHDRAW]: false,
  });

  const toggleModal = (type: BondModals) => (open: boolean) => {
    toggleModals(state => ({ ...state, [type]: open }));
    togglePopover(false);
  };

  return (
    <>
      <Popover open={openPopover} onOpenChange={op => togglePopover(op)}>
        <PopoverTrigger asChild>
          <Ellipsis className='size-3 cursor-pointer' />
        </PopoverTrigger>
        <PopoverContent className='w-[190px]'>
          <button
            className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => toggleModal(BondModals.MINT)(true)}
          >
            Mint
          </button>
          <button
            className='w-full cursor-pointer border-t border-input-border px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => toggleModal(BondModals.DEPOSIT)(true)}
          >
            Deposit
          </button>
          <button
            className='w-full cursor-pointer border-t border-input-border px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => toggleModal(BondModals.WITHDRAW)(true)}
          >
            Withdraw
          </button>
        </PopoverContent>
      </Popover>
      <MintModal
        bond={bond}
        open={openModals[BondModals.MINT]}
        toggleOpen={toggleModal(BondModals.MINT)}
      />
      <DepositModal
        bond={bond}
        open={openModals[BondModals.DEPOSIT]}
        toggleOpen={toggleModal(BondModals.DEPOSIT)}
      />
      <WithdrawModal
        bond={bond}
        open={openModals[BondModals.WITHDRAW]}
        toggleOpen={toggleModal(BondModals.WITHDRAW)}
      />
    </>
  );
};
