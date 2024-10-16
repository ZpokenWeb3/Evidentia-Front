'use client';

import { useState } from 'react';
import { LoanModals } from './types';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { Ellipsis } from 'lucide-react';
import { RepayModal } from './repay-modal';

export const LoanTableActions = () => {
  const [openPopover, togglePopover] = useState<boolean>(false);
  const [openModals, toggleModals] = useState<Record<LoanModals, boolean>>({
    [LoanModals.REPAY]: false,
  });

  const toggleModal = (type: LoanModals) => (open: boolean) => {
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
            onClick={() => toggleModal(LoanModals.REPAY)(true)}
          >
            Repay
          </button>
        </PopoverContent>
      </Popover>
      <RepayModal open={openModals[LoanModals.REPAY]} toggleOpen={toggleModal(LoanModals.REPAY)} />
    </>
  );
};
