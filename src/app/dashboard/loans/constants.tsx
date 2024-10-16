import { OverviewCard } from '../types';
import { TableHeader } from '@/app/components/data-table';
import { ChartIcon } from '../shared/chart-icon';

export const loansOverviews: OverviewCard[] = [
  {
    title: 'Total Borrowed',
    key: 'totalBorrowed',
    icon: <ChartIcon color='#3354F4' id='1' />,
  },
  {
    title: 'Weekly interest',
    key: 'totalWeeklyInterest',
    icon: <ChartIcon color='#76DBE3' id='2' />,
  },
  {
    title: 'Total Debt',
    key: 'totalDebt',
    icon: <ChartIcon color='#5D2EE8' id='3' />,
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
  {
    key: 'action',
    value: '',
  },
];
