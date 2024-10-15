import { ChartCandlestick, FileMinus2, ReceiptText } from 'lucide-react';
import { OverviewCard } from './types';
import { PagePath } from '../config/nav';
import { Tab } from '../components/tabs';
import { TableHeader } from '../components/data-table';

export const dashboardTabs: Tab[] = [
  { title: 'Bonds', href: PagePath.Dashboard, enabled: true },
  { title: 'Loans', href: PagePath.Loans, enabled: true },
  { title: 'Staking', href: PagePath.Staking, enabled: false },
];

export const bondTabs: Tab[] = [
  { title: 'All', href: PagePath.Dashboard, enabled: true },
  { title: 'Minted', href: PagePath.Minted, enabled: true },
];

export const bondOverviews: OverviewCard[] = [
  {
    title: 'Available for mint',
    key: 'mint',
    icon: <FileMinus2 className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Total bonds minted',
    key: 'minted',
    icon: <ChartCandlestick className='size-5 stroke-2 text-icon' />,
  },
  {
    title: 'Number of bonds  in collateral',
    key: 'collateral',
    icon: <ReceiptText className='size-5 stroke-2 text-icon' />,
  },
];

export const allBondHeader: TableHeader[] = [
  {
    key: 'ISIN',
    value: 'ISIN',
  },
  { key: 'country', value: 'Country' },
  {
    key: 'APY',
    value: 'Bond APY',
  },
  {
    key: 'expirationTimestamp',
    value: 'Maturity date',
  },
  { key: 'availableToMint', value: 'Available for mint' },
  { key: 'minted', value: 'Minted' },
  { key: 'staked', value: 'In Collateral' },
  {
    key: 'action',
    value: '',
  },
];
