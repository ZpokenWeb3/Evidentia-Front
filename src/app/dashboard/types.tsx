import { ReactNode } from 'react';
import { PagePath } from '../config/nav';
import { UserBond } from '../types/bonds';

export type DashboardTab = PagePath.Dashboard | PagePath.Loans | PagePath.Staking;

export interface OverviewCard {
  title: string;
  icon: ReactNode;
  key: string;
}

export enum BondModals {
  MINT = 'mint',
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

export interface BondModalProps {
  bond: UserBond;
  open: boolean;
  toggleOpen: (val: boolean) => void;
}
