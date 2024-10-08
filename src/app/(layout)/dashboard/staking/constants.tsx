import { ChartCandlestick, ReceiptText } from 'lucide-react';
import { OverviewCard } from '../types';

export const stakeOverviews: OverviewCard[] = [
  {
    title: 'Staked Amount',
    key: 'totalStaked',
    icon: <ChartCandlestick className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Estimated APY',
    key: 'apy',
    icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Estimated Earnings (per year)',
    key: 'yearEarnings',
    icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
  },
];
