import Button from "@/components/Button";
import Address from "./components/Address";
import Verification from "./components/Verification";
import RecentChainActivity from "./components/RecentChainActivity";
import Link from "next/link";
import UrlHandler from "./components/UrlHandler";

export default function GlassTrustDashboard() {
  return (
    <main className="min-h-screen text-white">
      <section className="max-w-7xl sm:max-w-10/12 mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Trust Overview
          </h1>
          <Link href="/Verify">
            <Button className="cursor-pointer">
              <span className="w-fit px-4 py-1 text-xs sm:text-sm rounded-md bg-green-500/20 text-green-400 border border-green-500/20">
                VERIFY
              </span>
            </Button>
          </Link>
        </div>

        {/* MAIN GRID */}
        <div
          className="
            grid gap-5 sm:gap-6
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-12
          "
        >
          {/* TRUST SCORE (HERO) */}
          <div
            className="
              col-span-1 md:col-span-2 lg:col-span-12
              relative rounded-3xl
              bg-white/5 backdrop-blur-2xl
              border border-white/10
              p-6 sm:p-8 overflow-hidden
            "
          >
            {/* Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

            <Verification />

            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-zinc-300">
              <li>• Wallet age &gt; 2 years</li>
              <li>• Stable on-chain behavior</li>
              <li>• Low-risk contract usage</li>
              <li>• No suspicious patterns</li>
            </ul>
          </div>

          {/* IDENTITY */}
          <div
            className="
              col-span-1 lg:col-span-4
              rounded-2xl bg-white/5 backdrop-blur-xl
              border border-white/10 p-5 sm:p-6
            "
          >
            <p className="text-xs text-zinc-400 mb-2">Wallet Identity</p>

            <Address />
          </div>

          {/* ANALYTICS */}
          <div
            className="
              col-span-1 lg:col-span-4
              rounded-2xl bg-white/5 backdrop-blur-xl
              border border-white/10 p-5 sm:p-6
            "
          >
            <p className="text-xs text-zinc-400 mb-4">Wallet Analytics</p>

            <div
              className="
                rounded-2xl bg-black/30 backdrop-blur-xl
                border border-cyan-500/20 p-4 sm:p-5
              "
            >
              <p className="text-xs uppercase tracking-wider text-cyan-400 mb-3">
                Why this score?
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <li className="flex gap-2">
                  <span className="text-cyan-400">▸</span>
                  Wallet age exceeds 2 years
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">▸</span>
                  Consistent transactions
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">▸</span>
                  Low-risk smart contracts
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-400">▸</span>
                  No anomalies detected
                </li>
              </ul>
            </div>
          </div>

          {/* RISK */}
          <div
            className="
              col-span-1 lg:col-span-4
              rounded-2xl bg-white/5 backdrop-blur-xl
              border border-white/10 p-5 sm:p-6
            "
          >
            <p className="text-xs text-zinc-400 mb-4">Risk Signals</p>

            <p className="text-sm text-cyan-400">
              No high-risk indicators detected
            </p>
          </div>

          {/* ACTIVITY */}
          <RecentChainActivity />
          {/* PUBLIC PROOF */}
          <div
            className="
              col-span-1 md:col-span-2 lg:col-span-4
              rounded-2xl bg-white/5 backdrop-blur-xl
              border border-white/10 p-5 sm:p-6
            "
          >
            <p className="text-xs text-zinc-400 mb-2">Public Verification</p>

            <UrlHandler verifyId="abcd0125ghijkl9090" />
          </div>
        </div>
      </section>
    </main>
  );
}
