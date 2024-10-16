'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { UserBond } from '@/app/types/bonds';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { MintModal } from './mint-modal';
import { StakeNftModal } from './stake-nft-modal';
import { Modals } from './types';
import { UnstakeNftModal } from './unstake-nft-modal';

interface TableActionProps {
  bond: UserBond;
}

export const TableAction = ({ bond }: TableActionProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [openModals, setOpenModals] = useState<Record<Modals, boolean>>({
    [Modals.MINT]: false,
    [Modals.STAKE]: false,
    [Modals.UNSTAKE]: false,
  });

  const openModal = (type: Modals) => (val: boolean) => {
    setOpenModals(state => ({ ...state, [type]: val }));
    setOpenPopover(false);
  };

  return (
    <>
      <Popover open={openPopover} onOpenChange={op => setOpenPopover(op)}>
        <PopoverTrigger asChild>
          <Ellipsis className='size-3 cursor-pointer' />
        </PopoverTrigger>
        <PopoverContent className='w-[190px]'>
          <button
            className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => openModal(Modals.MINT)(true)}
          >
            Mint
          </button>
          <button
            className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => openModal(Modals.STAKE)(true)}
          >
            Stake
          </button>
          <button
            className='w-full cursor-pointer px-3 py-[10px] text-left text-base font-medium focus:outline-none'
            onClick={() => openModal(Modals.UNSTAKE)(true)}
          >
            Unstake
          </button>
        </PopoverContent>
      </Popover>
      <MintModal bond={bond} open={openModals[Modals.MINT]} toggleOpen={openModal(Modals.MINT)} />
      <StakeNftModal
        bond={bond}
        open={openModals[Modals.STAKE]}
        setOpen={openModal(Modals.STAKE)}
      />
      <UnstakeNftModal
        bond={bond}
        open={openModals[Modals.UNSTAKE]}
        setOpen={openModal(Modals.UNSTAKE)}
      />
    </>
  );
};
