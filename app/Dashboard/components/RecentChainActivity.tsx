"use client";

import { useAccount } from "wagmi";
import { useRecentTxPreview } from "../hooks/useRecentTxPreview";

const shorten = (addr: string) =>
  addr.length > 10 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;

const RecentChainActivity = () => {
  const { address, isConnected } = useAccount();
  const txs = useRecentTxPreview(address as `0x${string}`);

  const recentThree = txs.slice(0, 3); // ✅ GUARANTEED ONLY 3

  return (
    <div
      className="
        col-span-1 md:col-span-2 lg:col-span-8
        rounded-2xl bg-white/5 backdrop-blur-xl
        border border-white/10 p-5 sm:p-6
      "
    >
      <p className="text-xs sm:text-sm text-zinc-400 mb-3">
        Recent On-Chain Activity
      </p>

      {recentThree.length === 0 ? (
        isConnected ? (
          <p className="text-xs text-zinc-500">No recent activity</p>
        ) : (
          <p className="text-xs text-zinc-500">
            Connect your wallet to see recent activity
          </p>
        )
      ) : (
        <ul className="space-y-2 text-xs sm:text-sm">
          {recentThree.map((tx, i) => (
            <li key={i} className="flex justify-between items-center gap-2">
              <span className="font-mono text-zinc-200">{shorten(tx.to)}</span>

              <span className="text-zinc-400">{tx.type}</span>

              <span className="text-zinc-500">
                {tx.amount} · {tx.network}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentChainActivity;
