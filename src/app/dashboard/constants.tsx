import { OverviewCard } from './types';
import { PagePath } from '../config/nav';
import { Tab } from '../components/tabs';
import { TableHeader } from '../components/data-table';
import { ChartIcon } from './shared/chart-icon';

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
    icon: <ChartIcon color='#3354F4' id='1' />,
  },
  {
    title: 'Total bonds minted',
    key: 'minted',
    icon: <ChartIcon color='#76DBE3' id='2' />,
  },
  {
    title: 'Number of bonds  in collateral',
    key: 'collateral',
    icon: <ChartIcon color='#5D2EE8' id='3' />,
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
  { key: 'staked', value: 'Collateral' },
  {
    key: 'action',
    value: '',
  },
];
