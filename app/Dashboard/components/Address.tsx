"use client";

import { useAccount } from "wagmi";
import addrRed from "../utils/reducer";

const Address = () => {
  const { address, chainId, chain } = useAccount();
  return (
    <>
      <code className="text-xs sm:text-sm break-all text-cyan-300">
        {addrRed(address)}
      </code>
      <p className="mt-4 text-xs text-zinc-400 pb-2">Network</p>
      <p className="text-sm">
        {address ? `${chain?.name} (Chain ID ${chainId})` : "Connect Wallet"}
      </p>
    </>
  );
};

export default Address;
