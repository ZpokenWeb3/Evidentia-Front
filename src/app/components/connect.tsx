import { ConnectButton } from 'thirdweb/react';
import { accountAbstraction, thirdwebClient, wallets } from '../config/thirdweb';
import { SBC } from '../config/erc20';

export const Connect = () => {
  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      accountAbstraction={accountAbstraction}
      supportedTokens={{
        11155111: [{ ...SBC, address: SBC.address[11155111]! }],
      }}
    />
  );
};
