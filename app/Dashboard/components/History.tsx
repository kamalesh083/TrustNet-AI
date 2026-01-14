"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { ArrowUpRight, History as HistoryIcon, Lock } from "lucide-react";

const History = () => {
  const { isConnected } = useAccount();

  return (
    <>
      <p className="text-xs text-zinc-400 mb-4">Historical Overview</p>

      {isConnected ? (
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Link
            href="/History"
            className="
              group relative block overflow-hidden rounded-2xl
              bg-linear-to-br from-black/60 to-black/20
              backdrop-blur-xl
              border border-cyan-500/20
              p-5
              hover:border-cyan-400/40
              focus:outline-none focus:ring-1 focus:ring-cyan-400/40
            "
          >
            {/* animated glow */}
            <div
              className="
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.15),transparent_60%)]
              "
            />

            {/* left accent */}
            <span className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-cyan-400/80 to-transparent rounded-full" />

            <div className="relative pl-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-400">
                  <HistoryIcon size={16} />
                  <p className="text-xs uppercase tracking-wider">
                    Verification History
                  </p>
                </div>

                <ArrowUpRight
                  size={16}
                  className="
                    text-zinc-400
                    transition-transform duration-300
                    group-hover:translate-x-1 group-hover:-translate-y-1
                    group-hover:text-cyan-400
                  "
                />
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Review all trust verifications performed by this wallet,
                including previously checked addresses and outcomes.
              </p>

              <div className="text-xs text-zinc-500 flex items-center gap-1">
                Open verification history
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 1 }}
          className="
            relative rounded-2xl
            bg-black/30 backdrop-blur-xl
            border border-white/10
            p-5
          "
        >
          <span className="absolute left-0 top-0 h-full w-1 bg-white/20 rounded-full" />

          <div className="pl-5 space-y-3 text-center">
            <div className="flex items-center justify-center gap-2 text-zinc-400">
              <Lock size={14} />
              <p className="text-xs uppercase tracking-wider">
                Verification History
              </p>
            </div>

            <p className="text-sm text-zinc-300">
              Connect your wallet to view your verification history.
            </p>

            <p className="text-xs text-zinc-500">Wallet connection required</p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default History;
