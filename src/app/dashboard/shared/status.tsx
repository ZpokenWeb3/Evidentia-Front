import { cn } from '@/app/lib/utils';
import { BondStatus } from '@/app/types/bonds';
import { ArrowsUpFromLine, ArrowUpRight, Check, Landmark, X } from 'lucide-react';
import { ReactNode } from 'react';

const statusValues: Record<BondStatus, { icon: ReactNode; bg: string }> = {
  [BondStatus.SUBMITTED]: {
    icon: <Check className='size-4 stroke-2 text-[#000000]' />,
    bg: 'bg-status-success',
  },
  [BondStatus.REJECTED]: {
    icon: <X className='size-4 stroke-2 text-[#000000]' />,
    bg: 'bg-status-rejected',
  },
  [BondStatus.READY_FOR_MINT]: {
    icon: <ArrowUpRight className='size-4 stroke-2 text-[#000000]' />,
    bg: 'bg-status-ready',
  },
  [BondStatus.MINTED]: {
    icon: <ArrowsUpFromLine className='size-4 rotate-90 stroke-2 text-white' />,
    bg: 'bg-status-minted text-white',
  },
  [BondStatus.UNDER_COLLATERAL]: {
    icon: <Landmark className='size-4 stroke-2 text-white' />,
    bg: 'bg-primary text-white',
  },
};

export const Status = ({ status }: { status: BondStatus }) => {
  return (
    <div
      className={cn(
        'flex items-center w-fit gap-[10px] rounded-lg px-[6px] py-[2px]',
        statusValues[status].bg,
      )}
    >
      <div>{statusValues[status].icon}</div>
      <p className='text-sm font-medium'>{status}</p>
    </div>
  );
};
