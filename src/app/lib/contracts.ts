import { Chain, getContract } from 'thirdweb';
import { NFTStakingAndBorrowingAbi } from '../abi/NFTStakingAndBorrowing';
import { StableBondCoinsAbi } from '../abi/StableBondCoins';
import { StableCoinsStakingAbi } from '../abi/StableCoinsStaking';
import { addresses } from '../config/addresses';
import { thirdwebClient } from '../config/thirdweb';
import { BondNFTAbi } from '../abi/BondNFT';

export const getNftContract = (chain: Chain) => {
  return getContract({
    chain,
    address: addresses[chain.id]!.BOND_NFT,
    client: thirdwebClient,
    abi: BondNFTAbi,
  });
};

export const getStakingAndBorrowingContract = (chain: Chain) => {
  return getContract({
    chain,
    address: addresses[chain.id]!.NFT_STAKING_AND_BORROWING,
    client: thirdwebClient,
    abi: NFTStakingAndBorrowingAbi,
  });
};

export const getStableBondCoins = (chain: Chain) => {
  return getContract({
    chain,
    address: addresses[chain.id]!.STABLE_BOND_COINS,
    client: thirdwebClient,
    abi: StableBondCoinsAbi,
  });
};

export const getStableCoinsStaking = (chain: Chain) => {
  return getContract({
    chain,
    address: addresses[chain.id]!.STABLE_COINS_STAKING,
    client: thirdwebClient,
    abi: StableCoinsStakingAbi,
  });
};
