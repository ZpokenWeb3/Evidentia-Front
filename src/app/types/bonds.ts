export interface Bond {
  APY: number;
  country: string;
  value: number;
  couponValue: number;
  issueTimestamp: number;
  expirationTimestamp: number;
  ISIN: string;
  tokenId: string;
}

export interface UserBond extends Bond {
  allowedToMints: bigint;
  availableToMint: bigint;
  staked: bigint;
  minted: bigint;
  availableToDeposit: bigint;
}
