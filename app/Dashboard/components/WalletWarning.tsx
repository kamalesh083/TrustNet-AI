"use client";

import { useAccount } from "wagmi";
import { Wallet } from "lucide-react";

export default function WalletWarningBanner() {
  const { isConnected } = useAccount();

  if (isConnected) return null;

  return (
    <div
      className="
        w-full
        bg-yellow-500/10
        border-b border-yellow-500/20
        px-6 py-3
        text-yellow-400
        flex items-center gap-3
        rounded-lg mb-6
      "
    >
      <Wallet className="w-5 h-5 shrink-0" />
      <p className="text-sm">
        Wallet not connected. Connect your wallet to enable verification and
        on-chain analysis.
      </p>
    </div>
  );
}
