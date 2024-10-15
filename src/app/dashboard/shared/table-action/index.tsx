'use client';

import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { UserBond } from '@/app/types/bonds';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { MintModal } from './mint-modal';
import { StakeNftModal } from './stake-nft-modal';
import { UnstakeNftModal } from './unstake-nft-modal';

interface TableActionProps {
  bond: UserBond;
}

export const TableAction = ({ bond }: TableActionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={op => setOpen(op)}>
      <PopoverTrigger asChild>
        <Ellipsis className='size-3 cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className='w-[190px]'>
        {bond.availableToMint && <MintModal bond={bond} />}
        <StakeNftModal bond={bond} />
        <UnstakeNftModal bond={bond} />
      </PopoverContent>
    </Popover>
  );
};
