export function sumByKey<T, K extends keyof T>(array: T[], key: K): bigint {
  return array.reduce((acc, i) => {
    if (
      typeof i[key] === 'bigint' ||
      typeof i[key] === 'boolean' ||
      typeof i[key] === 'string' ||
      typeof i[key] === 'number'
    ) {
      return acc + BigInt(i[key]);
    } else {
      return acc + BigInt(0);
    }
  }, BigInt(0));
}
