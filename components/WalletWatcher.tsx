"use client";

import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

export default function WalletWatcher() {
  const { isConnected } = useAccount();
  const wasConnected = useRef(false);

  useEffect(() => {
    // wallet JUST disconnected
    if (wasConnected.current && !isConnected) {
      window.location.reload(); // 🔥 FULL ROUTE RESTART
    }

    wasConnected.current = isConnected;
  }, [isConnected]);

  return null;
}
