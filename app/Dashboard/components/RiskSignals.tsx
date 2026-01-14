"use client";

import { useTrustStore } from "../hooks/useTrustscore";

const TrustInsights = () => {
  const score = useTrustStore((s) => s.trustScore);

  // 🔹 Empty state: wallet not connected / no data yet
  if (score === null) {
    return (
      <div className="relative flex items-center justify-center min-h-30">
        {/* cyan accent */}
        <span className="absolute left-0 top-0 h-full w-0.5 bg-cyan-400/60 rounded-full" />

        <div className="pl-4 text-center max-w-sm">
          <p className="text-xs uppercase tracking-wider text-cyan-400 mb-2">
            AI Trust Insight
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed">
            Verify your wallet to view AI-generated trust insights and behavior
            analysis.
          </p>

          <p className="mt-2 text-xs text-zinc-400">
            Connect and verify your wallet to continue.
          </p>
        </div>
      </div>
    );
  }

  // 🔹 Normal insight state
  const insight =
    score >= 80
      ? {
          title: "High Trust Wallet",
          description:
            "This wallet demonstrates consistent and predictable on-chain behavior with minimal exposure to risky interactions. Suitable for trust-based access and verification.",
          tone: "text-emerald-400",
        }
      : score >= 60
      ? {
          title: "Moderate Trust Wallet",
          description:
            "This wallet shows generally stable behavior but may include limited interaction with moderate-risk contracts. Suitable with caution.",
          tone: "text-yellow-400",
        }
      : {
          title: "Low Trust Wallet",
          description:
            "This wallet exhibits irregular or higher-risk behavior patterns. Additional verification is recommended before granting trust-based privileges.",
          tone: "text-red-400",
        };

  return (
    <div className="relative space-y-4">
      {/* subtle cyan accent line */}
      <span className="absolute left-0 top-0 h-full w-0.5 bg-cyan-400/60 rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between pl-4 pb-5">
        <p className="text-xs uppercase tracking-wider text-cyan-400">
          AI Trust Insight
        </p>
        <span className={`text-xs font-medium ${insight.tone}`}>
          {insight.title}
        </span>
      </div>

      {/* Description */}
      <p className="pl-4 text-sm leading-relaxed text-zinc-300">
        {insight.description}
      </p>

      {/* Footer hint */}
      <div className="pl-4 pt-3 border-t border-white/10">
        <p className="text-xs text-zinc-400">
          Insight generated using aggregated on-chain behavior analysis.
        </p>
      </div>
    </div>
  );
};

export default TrustInsights;
