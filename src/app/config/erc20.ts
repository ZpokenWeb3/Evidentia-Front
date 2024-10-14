import { ERC20 } from '../types/erc20';

export const SBC: ERC20 = {
  name: 'Stable Bond Coins',
  symbol: 'SBC',
  decimals: 6,
  address: {
    1440002: '0x791E5F801C2c3BA0B93Ad123b71Ee4c9b7d1b45F',
    11155111: '0xbDBc6f32699c39DF208595BfC7Dfb96C6F837aBE',
  },
};

export const erc20: ERC20[] = [SBC];
