import BigNumber from 'bignumber.js';

export function formatNumber(number: number | bigint) {
  return number.toLocaleString('en-GB');
}

export const removeTrailingZeros = (strNum: string): string => {
  return strNum.replace(/(\.\d*?[1-9])0+$|\.0*$/, '$1');
};

export const fromBaseUnitAmount = (amount: bigint, exponent = 0): BigNumber => {
  const bigNum = new BigNumber(amount.toString());
  return bigNum.dividedBy(exponent ? BigNumber(10).pow(exponent) : 1);
};

export const formatAmount = ({
  amount,
  exponent = 0,
  commas = false,
  decimalPlaces = 2,
}: {
  amount: bigint;
  exponent?: number;
  commas?: boolean;
  decimalPlaces?: number;
}) => {
  const result = fromBaseUnitAmount(amount, exponent).toFormat(decimalPlaces, {
    decimalSeparator: '.',
    groupSeparator: commas ? ',' : '',
    groupSize: 3,
  });

  return removeTrailingZeros(result);
};
