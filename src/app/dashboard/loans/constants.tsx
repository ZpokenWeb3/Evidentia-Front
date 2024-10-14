import { ChartCandlestick, ReceiptText } from 'lucide-react';
import { OverviewCard } from '../types';
import { TableHeader } from '@/app/components/data-table';

export const loansOverviews: OverviewCard[] = [
  {
    title: 'Borrowed',
    key: 'totalBorrowed',
    icon: <ChartCandlestick className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Weekly interest',
    key: 'totalWeeklyInterest',
    icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Debt',
    key: 'totalDebt',
    icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
  },
];

export const allLoansHeader: TableHeader[] = [
  {
    key: 'currency',
    value: 'Currency',
  },
  { key: 'weeklyInterest', value: 'Weekly interest' },
  {
    key: 'borrowed',
    value: 'Borrowed',
  },
  {
    key: 'debt',
    value: 'Debt',
  },
];
