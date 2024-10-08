import { privateKeyToAccount } from 'thirdweb/wallets'
import { thirdwebClient } from '../config/thirdweb'
import {
	Chain,
	getContract,
	prepareContractCall,
	sendTransaction,
	waitForReceipt,
} from 'thirdweb'
import { BondNFTAbi } from '../abi/BondNFT'
import { Bond } from '../types/bonds'
import { hashString } from './string'
import { parseUnits } from 'ethers/lib/utils'
import { addresses } from '../config/addresses'

export const createMetadata = async (bond: Bond, chain: Chain) => {
	const wallet = privateKeyToAccount({
		client: thirdwebClient,
		privateKey: process.env['NEXT_PUBLIC_PRIVATE_KEY']!,
	})

	const contract = getContract({
		chain,
		address: addresses[chain.id]!.BOND_NFT,
		client: thirdwebClient,
		abi: BondNFTAbi,
	})

	const metadata = {
		value: parseUnits(bond?.value.toString() || '0', 6).toBigInt(),
		couponValue: parseUnits(bond?.couponValue.toString() || '0', 6).toBigInt(),
		issueTimestamp: BigInt(bond?.issueTimestamp || 0),
		expirationTimestamp: BigInt(bond?.expirationTimestamp || 0),
		ISIN: bond?.ISIN || '',
	}

	const tokenId = BigInt(hashString(metadata.ISIN))

	console.log('Metadata:', metadata)
	console.log('TokenId: ', tokenId)

	const transaction = prepareContractCall({
		contract,
		method: 'setMetaData',
		params: [tokenId, metadata],
	})

	await sendTransaction({
		account: wallet,
		transaction,
	})
}

export const setAllowedMints = async (
	user: string,
	tokenId: bigint,
	amount: bigint,
	chain: Chain
) => {
	const wallet = privateKeyToAccount({
		client: thirdwebClient,
		privateKey: process.env['NEXT_PUBLIC_PRIVATE_KEY']!,
	})

	console.log(wallet.address)

	const contract = getContract({
		chain,
		address: addresses[chain.id]!.BOND_NFT,
		client: thirdwebClient,
		abi: BondNFTAbi,
	})

	const transaction = prepareContractCall({
		contract,
		method: 'setAllowedMints',
		params: [user, tokenId, amount],
	})

	const { transactionHash } = await sendTransaction({
		account: wallet,
		transaction,
	})

	await waitForReceipt({
		client: thirdwebClient,
		chain,
		transactionHash,
	})
}
