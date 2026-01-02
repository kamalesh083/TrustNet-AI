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

const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export function useRecentTxPreview(address?: `0x${string}`) {
  const { chain, chainId } = useAccount();
  const [txs, setTxs] = useState<PreviewTx[]>([]);

  useEffect(() => {
    if (!address || !chainId) return;

    const cacheKey = `recentTxs:${address}:${chainId}`;

    const fetchTxs = async () => {
      try {
        // ✅ 1. Check cache
        const cached = localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const isFresh = Date.now() - parsed.timestamp < CACHE_TTL;

          if (isFresh) {
            setTxs(parsed.data);
            return; // ⛔ stop API call
          }
        }

        // ✅ 2. Fetch from API
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

        // ✅ 3. Save to cache
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: formatted,
            timestamp: Date.now(),
          })
        );

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
