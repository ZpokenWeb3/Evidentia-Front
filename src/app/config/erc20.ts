import { ERC20 } from '../types/erc20';
import { addresses } from './addresses';

export const SBC: ERC20 = {
  name: 'Stable Bond Coins',
  symbol: 'SBC',
  decimals: 6,
  address: {
    1440002: addresses[1440002]?.STABLE_BOND_COINS ?? '',
    11155111: addresses[11155111]?.STABLE_BOND_COINS ?? '',
  },
};

export const erc20: ERC20[] = [SBC];
