import { UserBond } from '@/app/types/bonds';

export enum Modals {
  MINT = 'mint',
  STAKE = 'stake',
  UNSTAKE = 'unstake',
}

export interface ModalProps {
  bond: UserBond;
  open: boolean;
  toggleOpen: (val: boolean) => void;
}
