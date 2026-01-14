"use client";

import { useEffect, useState } from "react";
import { VerificationHistory } from "./types/verification";
import { formatTimestamp } from "./utils/formatTime";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const getColorClasses = (score: number) => {
  if (score >= 80)
    return {
      divider: "via-green-400/60",
      rail: "bg-green-400",
      bg: "bg-green-500/5",
      score: "text-green-400",
    };
  if (score >= 60)
    return {
      divider: "via-yellow-400/60",
      rail: "bg-yellow-400",
      bg: "bg-yellow-500/5",
      score: "text-yellow-400",
    };
  return {
    divider: "via-red-400/60",
    rail: "bg-red-400",
    bg: "bg-red-500/5",
    score: "text-red-400",
  };
};

export default function VerificationHistoryPage() {
  const [history, setHistory] = useState<VerificationHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { address } = useAccount();
  const router = useRouter();

  // replace later with wallet address
  useEffect(() => {
    if (!address) {
      router.replace("/Dashboard");
    }
  }, [address, router]);

  useEffect(() => {
    fetch(`/api/history/${address}`)
      .then((res) => res.json())
      .then(setHistory)
      .finally(() => setLoading(false));
  }, [address]);

  if (loading) {
    return (
      <div className="pt-20 text-center text-gray-400 ">
        Loading verification history…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      {/* HEADER */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold block bg-linear-to-r from-white via-sky-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
          Verification History
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-400">
          A chronological log of trust verifications performed on this identity.
        </p>

        <div className="mt-6 h-1 w-32 rounded bg-linear-to-r from-green-400 via-yellow-400 to-cyan-400 shadow-md shadow-cyan-400/40" />
      </div>

      {history.map((item, index) => {
        const colors = getColorClasses(item.trustScore);

        return (
          <div key={index}>
            {index !== 0 && (
              <div
                className={`my-12 h-1 w-full bg-linear-to-r from-transparent ${colors.divider} to-transparent`}
              />
            )}

            <div
              className={`relative rounded-2xl border border-white/10 p-6 backdrop-blur-lg shadow-xl shadow-black/40 ${colors.bg}`}
            >
              <div
                className={`absolute left-0 top-0 h-full w-1.5 rounded-l-2xl ${colors.rail}`}
              />

              {/* CARD HEADER */}
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-400">Verified Email</p>
                  <p className="text-white">{item.mail}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Trust Score</p>
                  <p className={`text-xl font-bold ${colors.score}`}>
                    {item.trustScore}
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 text-sm">
                <div className="rounded-lg bg-white/10 p-3">
                  Wallet Age: {item.details.walletAge}
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  Confidence: {(item.details.confidenceScore * 100).toFixed(0)}%
                </div>
                <div className="rounded-lg bg-white/10 p-3">
                  Tx Count: {item.details.totalTransactions}
                </div>
              </div>

              {/* REASONS */}
              <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {item.reasons.map((r, i) => (
                  <li
                    key={i}
                    className="rounded-lg bg-white/10 px-3 py-2 text-sm"
                  >
                    • {r}
                  </li>
                ))}
              </ul>

              <div className="mt-6 text-right text-xs text-gray-400">
                Verified on {formatTimestamp(item.timestamp)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
