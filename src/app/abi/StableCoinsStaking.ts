export const StableCoinsStakingAbi = [
	{
		type: 'constructor',
		inputs: [
			{
				name: '_stakingToken',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '_externalRewardContract',
				type: 'address',
				internalType: 'address',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'claimRewards',
		inputs: [],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'expectedAPY',
		inputs: [
			{
				name: '_staker',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'externalRewardContract',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'contract IExternalRewardContract',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'lastUpdateTime',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'pendingRewards',
		inputs: [
			{
				name: '_staker',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'rewardPerTokenStored',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'stake',
		inputs: [
			{
				name: '_amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'stakeOnBehalfOf',
		inputs: [
			{
				name: '_amount',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'onBehalfOf',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'stakers',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [
			{
				name: 'stakedAmount',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'rewardPaid',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'userRewardPerTokenPaid',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'rewardsEarned',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'stakeTimestamp',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'stakingToken',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'contract IERC20',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'totalStaked',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'withdraw',
		inputs: [
			{
				name: '_amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'event',
		name: 'RewardClaimed',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'reward',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'Staked',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'Withdrawn',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'amount',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
			},
		],
		anonymous: false,
	},
	{
		type: 'error',
		name: 'NoRewardsAvailable',
		inputs: [],
	},
	{
		type: 'error',
		name: 'NotEnoughStaked',
		inputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
	},
	{
		type: 'error',
		name: 'ZeroAmountNotAllowed',
		inputs: [],
	},
] as const
