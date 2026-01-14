"use client";

import { useAccount } from "wagmi";
import addrRed from "../utils/reducer";
import { Check, Copy, Network } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Address = () => {
  const { address, chainId, chain } = useAccount();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* ADDRESS SECTION */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-zinc-400">
          Connected Wallet
        </p>

        <div
          className="
            flex items-center gap-3
            rounded-xl
            bg-black/30 backdrop-blur
            border border-cyan-500/20
            px-3 py-2
          "
        >
          <code className="flex-1 text-xs sm:text-sm text-cyan-300 break-all">
            {address ? addrRed(address) : "Not Connected"}
          </code>

          {/* COPY BUTTON */}
          {address && (
            <motion.button
              onClick={handleCopy}
              whileTap={{ scale: 0.85 }}
              aria-label="Copy wallet address"
              className="
                relative w-5 h-5
                text-cyan-300
                hover:text-cyan-400
                transition-colors
              "
            >
              <Copy
                size={18}
                className={`
                  absolute inset-0
                  transition-all duration-200 cursor-pointer
                  ${copied ? "scale-0 opacity-0" : "scale-100 opacity-100"}
                `}
              />

              <Check
                size={18}
                className={`
                  absolute inset-0 text-emerald-400
                  transition-all duration-200
                  ${copied ? "scale-100 opacity-100" : "scale-0 opacity-0"}
                `}
              />
            </motion.button>
          )}
        </div>
      </div>

      {/* NETWORK SECTION */}
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-zinc-400 flex items-center gap-1">
          <Network size={12} />
          Network
        </p>

        <div
          className="
      inline-flex items-center gap-2
      rounded-full
      bg-cyan-500/10
      border border-cyan-400/30
      px-4 py-1.5
      text-sm
      shadow-[0_0_12px_rgba(34,211,238,0.15)]
    "
        >
          {/* status dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
          </span>

          {address ? (
            <>
              <span className="text-cyan-300 font-medium">{chain?.name}</span>
              <span className="text-xs text-cyan-200/70">(ID {chainId})</span>
            </>
          ) : (
            <span className="text-zinc-400">No network detected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
