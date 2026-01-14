import Address from "./components/Address";
import Verification from "./components/Verification";
import RecentChainActivity from "./components/RecentChainActivity";

import UrlHandler from "./components/UrlHandler";
import WalletWarningBanner from "./components/WalletWarning";
import VerifyButton from "./components/VerifyButton";
import RiskSignals from "./components/RiskSignals";
import History from "./components/History";

export default function GlassTrustDashboard() {
  return (
    <main className="min-h-screen text-white bg-black pt-5">
      <section className="max-w-7xl sm:max-w-10/12 mx-auto px-5 sm:px-6 py-8 sm:py-10">
        {/* Wallet warning*/}
        <WalletWarningBanner />
        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Trust Overview
          </h1>
          {/* Verify Button */}
          <VerifyButton />
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
            <History />
          </div>

          {/* RISK */}
          <div
            className="
              col-span-1 lg:col-span-4
              rounded-2xl bg-white/5 backdrop-blur-xl
              border border-white/10 p-5 sm:p-6
            "
          >
            <RiskSignals />
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

            <UrlHandler />
          </div>
        </div>
      </section>
    </main>
  );
}
