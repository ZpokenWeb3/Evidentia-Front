export const NFTStakingAndBorrowingAbi = [
	{
		type: 'constructor',
		inputs: [
			{
				name: '_stableToken',
				type: 'address',
				internalType: 'address',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'LIQUIDATION_TIME_WINDOW',
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
		name: 'PROTOCOL_YIELD',
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
		name: 'RewardsTransfered',
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
		name: 'SAFETY_FEE',
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
		name: 'STABLES_STAKING_ADDRESS',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'borrow',
		inputs: [
			{
				name: 'amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'calculateMaxBorrow',
		inputs: [
			{
				name: 'totalAmount',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'fromTime',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'toTime',
				type: 'uint256',
				internalType: 'uint256',
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
		name: 'getRewardAmount',
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
		name: 'getRewards',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'getTotalStats',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'tuple',
				internalType: 'struct NFTStakingAndBorrowing.TotalStats',
				components: [
					{
						name: 'staked',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'borrowed',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'debt',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'debtUpdateTimestamp',
						type: 'uint256',
						internalType: 'uint256',
					},
				],
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'getUserStats',
		inputs: [
			{
				name: 'userAddress',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [
			{
				name: '',
				type: 'tuple',
				internalType: 'struct NFTStakingAndBorrowing.UserStats',
				components: [
					{
						name: 'staked',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'nominalAvailable',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'borrowed',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'debt',
						type: 'uint256',
						internalType: 'uint256',
					},
					{
						name: 'debtUpdateTimestamp',
						type: 'uint256',
						internalType: 'uint256',
					},
				],
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'liquidate',
		inputs: [
			{
				name: 'nftAddress',
				type: 'address',
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'positionOwner',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'onERC1155BatchReceived',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'uint256[]',
				internalType: 'uint256[]',
			},
			{
				name: '',
				type: 'uint256[]',
				internalType: 'uint256[]',
			},
			{
				name: '',
				type: 'bytes',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				name: '',
				type: 'bytes4',
				internalType: 'bytes4',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'onERC1155Received',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: '',
				type: 'bytes',
				internalType: 'bytes',
			},
		],
		outputs: [
			{
				name: '',
				type: 'bytes4',
				internalType: 'bytes4',
			},
		],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'owner',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'renounceOwnership',
		inputs: [],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'repay',
		inputs: [
			{
				name: 'amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setLiquidationTimeWindow',
		inputs: [
			{
				name: '_timeWindowInSeconds',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setProtocolYield',
		inputs: [
			{
				name: '_protocolYieldInBips',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setSafetyFee',
		inputs: [
			{
				name: '_safetyFeeInBips',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'setStablesStakingAddress',
		inputs: [
			{
				name: '_address',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'stableToken',
		inputs: [],
		outputs: [
			{
				name: '',
				type: 'address',
				internalType: 'contract IMintableERC20',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'stakeNFT',
		inputs: [
			{
				name: 'nftAddress',
				type: 'address',
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'stakeNFTandStables',
		inputs: [
			{
				name: 'nftAddress',
				type: 'address',
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'amountNft',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'stakeStables',
		inputs: [
			{
				name: 'amount_to_stake',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'supportsInterface',
		inputs: [
			{
				name: 'interfaceId',
				type: 'bytes4',
				internalType: 'bytes4',
			},
		],
		outputs: [
			{
				name: '',
				type: 'bool',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'function',
		name: 'transferOwnership',
		inputs: [
			{
				name: 'newOwner',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'unstakeNFT',
		inputs: [
			{
				name: 'nftAddress',
				type: 'address',
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'amount',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'userAvailableToBorrow',
		inputs: [
			{
				name: 'userAddress',
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
		name: 'userNFTs',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
			{
				name: '',
				type: 'uint256',
				internalType: 'uint256',
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
		name: 'whitelistNFT',
		inputs: [
			{
				name: 'nftAddress',
				type: 'address',
				internalType: 'address',
			},
			{
				name: 'status',
				type: 'bool',
				internalType: 'bool',
			},
		],
		outputs: [],
		stateMutability: 'nonpayable',
	},
	{
		type: 'function',
		name: 'whitelistedNFTs',
		inputs: [
			{
				name: '',
				type: 'address',
				internalType: 'address',
			},
		],
		outputs: [
			{
				name: '',
				type: 'bool',
				internalType: 'bool',
			},
		],
		stateMutability: 'view',
	},
	{
		type: 'event',
		name: 'Borrowed',
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
		name: 'Liquidated',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'liquidator',
				type: 'address',
				indexed: false,
				internalType: 'address',
			},
			{
				name: 'nftAddress',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
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
		name: 'NFTStaked',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'nftAddress',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
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
		name: 'NFTUnstaked',
		inputs: [
			{
				name: 'user',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'nftAddress',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'tokenId',
				type: 'uint256',
				indexed: false,
				internalType: 'uint256',
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
		name: 'OwnershipTransferred',
		inputs: [
			{
				name: 'previousOwner',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
			{
				name: 'newOwner',
				type: 'address',
				indexed: true,
				internalType: 'address',
			},
		],
		anonymous: false,
	},
	{
		type: 'event',
		name: 'Repaid',
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
		name: 'BorrowAmountExceedsLimit',
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
		name: 'InsufficientBalanceToRepay',
		inputs: [],
	},
	{
		type: 'error',
		name: 'InsufficientNFTBalance',
		inputs: [],
	},
	{
		type: 'error',
		name: 'NFTNotWhitelisted',
		inputs: [],
	},
	{
		type: 'error',
		name: 'NotEnoughCollateral',
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
		name: 'OwnableInvalidOwner',
		inputs: [
			{
				name: 'owner',
				type: 'address',
				internalType: 'address',
			},
		],
	},
	{
		type: 'error',
		name: 'OwnableUnauthorizedAccount',
		inputs: [
			{
				name: 'account',
				type: 'address',
				internalType: 'address',
			},
		],
	},
	{
		type: 'error',
		name: 'PRBMath_MulDiv18_Overflow',
		inputs: [
			{
				name: 'x',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'y',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
	},
	{
		type: 'error',
		name: 'PRBMath_MulDiv_Overflow',
		inputs: [
			{
				name: 'x',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'y',
				type: 'uint256',
				internalType: 'uint256',
			},
			{
				name: 'denominator',
				type: 'uint256',
				internalType: 'uint256',
			},
		],
	},
	{
		type: 'error',
		name: 'PRBMath_UD60x18_Exp2_InputTooBig',
		inputs: [
			{
				name: 'x',
				type: 'uint256',
				internalType: 'UD60x18',
			},
		],
	},
	{
		type: 'error',
		name: 'PRBMath_UD60x18_Log_InputTooSmall',
		inputs: [
			{
				name: 'x',
				type: 'uint256',
				internalType: 'UD60x18',
			},
		],
	},
	{
		type: 'error',
		name: 'TooEarlyToLiquidate',
		inputs: [],
	},
] as const
