import { privateKeyToAccount } from 'thirdweb/wallets';
import { thirdwebClient } from '../config/thirdweb';
import { Chain, getContract, prepareContractCall, sendTransaction, waitForReceipt } from 'thirdweb';
import { addresses } from '../config/addresses';
import { BondNFTAbi } from '../abi/BondNFT';

export const setAllowedMints = async (
  user: string,
  tokenId: bigint,
  amount: bigint,
  chain: Chain,
) => {
  const wallet = privateKeyToAccount({
    client: thirdwebClient,
    privateKey: process.env['NEXT_PUBLIC_PRIVATE_KEY']!,
  });

  const contract = getContract({
    chain,
    address: addresses[chain.id]!.BOND_NFT,
    client: thirdwebClient,
    abi: BondNFTAbi,
  });

  const transaction = prepareContractCall({
    contract,
    method: 'setAllowedMints',
    params: [user, tokenId, amount],
  });

  const { transactionHash } = await sendTransaction({
    account: wallet,
    transaction,
  });

  await waitForReceipt({
    client: thirdwebClient,
    chain,
    transactionHash,
  });
};
