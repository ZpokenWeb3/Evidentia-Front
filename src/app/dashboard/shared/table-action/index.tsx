'use client';

import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { MintModal } from './mint-modal';
import { StakeNftModal } from './stake-nft-modal';
import { UnstakeNftModal } from './unstake-nft-modal';
import { BondStatus, UserBond } from '@/app/types/bonds';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';

interface TableActionProps {
  bond: UserBond;
}

export const TableAction = ({ bond }: TableActionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  if (bond.status === BondStatus.REJECTED || bond.status === BondStatus.SUBMITTED) return <></>;

  return (
    <Popover open={open} onOpenChange={op => setOpen(op)}>
      <PopoverTrigger asChild>
        <Ellipsis className='size-3 cursor-pointer' />
      </PopoverTrigger>
      <PopoverContent className='w-[190px]'>
        {bond.status === BondStatus.READY_FOR_MINT && <MintModal bond={bond} />}
        {bond.status === BondStatus.MINTED && <StakeNftModal bond={bond} />}
        {bond.status === BondStatus.UNDER_COLLATERAL && <UnstakeNftModal bond={bond} />}
      </PopoverContent>
    </Popover>
  );
};
