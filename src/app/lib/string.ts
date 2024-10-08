import { toUtf8Bytes } from 'ethers/lib/utils';
import { keccak256 } from 'thirdweb';

export const hashString = (str: string): string => {
  return keccak256(toUtf8Bytes(str));
};

export const cutString = (str: string, before: number, after: number) => {
  const lastIndex = str.length;
  return str.slice(0, before) + '...' + str.slice(lastIndex - after, lastIndex);
};
