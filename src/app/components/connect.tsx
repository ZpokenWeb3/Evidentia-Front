import { ConnectButton } from 'thirdweb/react';
import { thirdwebClient, wallets, xrpLedger } from '../config/thirdweb';
import { SBC } from '../config/erc20';

export const Connect = () => {
  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={wallets}
      supportedTokens={{
        1440002: [{ ...SBC, address: SBC.address[1440002]! }],
      }}
      chain={xrpLedger}
    />
  );
};
