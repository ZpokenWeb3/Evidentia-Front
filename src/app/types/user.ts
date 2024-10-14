export interface UserStats {
  borrowed: bigint;
  debt: bigint;
  debtUpdateTimestamp: bigint;
  nominalAvailable: bigint;
  staked: bigint;
}

export interface UserStake {
  stakedAmount: bigint;
  rewardPaid: bigint;
  userRewardPerTokenPaid: bigint;
  rewardsEarned: bigint;
  stakeTimestamp: bigint;
  expectedAPY: bigint;
}
