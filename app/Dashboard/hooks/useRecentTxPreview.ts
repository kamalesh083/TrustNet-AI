/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

interface PreviewTx {
  to: string;
  type: "Sent" | "Received";
  amount: string;
  network: string;
}

export function useRecentTxPreview(address?: `0x${string}`) {
  const { chain, chainId } = useAccount();

  const [txs, setTxs] = useState<PreviewTx[]>([]);

  useEffect(() => {
    if (!address || !chainId) return;

    const fetchTxs = async () => {
      try {
        const res = await axios.post("/api/wallet", {
          address,
          chainId,
        });

        const formatted: PreviewTx[] = res.data.map((tx: any) => ({
          to: tx.to,
          type:
            tx.from.toLowerCase() === address.toLowerCase()
              ? "Sent"
              : "Received",
          amount: (Number(tx.value) / 1e18).toFixed(4),
          network: chain?.name ?? "Unknown",
        }));

        setTxs(formatted);
      } catch (error) {
        console.error("Recent TX fetch failed:", error);
        setTxs([]);
      }
    };

    fetchTxs();
  }, [address, chainId, chain?.name]);

  return txs;
}
