"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/ui/card";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// ---- Types ----
export interface VerificationHistory {
  trustScore: number;
  mail: string;
  reasons: string[];
  details: {
    walletAge: string;
    confidenceScore: number;
    totalTransactions: number;
  };
  timestamp: number;
}

function formatWalletAge(days: number): string {
  if (!days || isNaN(days)) return "N/A";

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  if (years > 0) return `${years}y ${months}m`;
  return `${months} month(s)`;
}

export default function ProfilePage() {
  const params = useParams();
  const address = params?.address as string;
  const [profile, setProfile] = useState<VerificationHistory | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  // ---- FETCH FROM BLOCKCHAIN ----
  useEffect(() => {
    if (!address) return;

    const fetchScore = async () => {
      try {
        setLoading(true);

        const { data } = await axios.post("/api/verify/readContract", {
          user: address,
        });

        console.log("Fetched score:", data);

        // ❌ Invalid response → NOT VERIFIED
        if (typeof data?.trustScore !== "number") {
          throw new Error("Invalid trust score");
        }

        // ✅ Parse details safely
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parsedDetails: any = {};
        if (data?.details) {
          try {
            parsedDetails =
              typeof data.details === "string"
                ? JSON.parse(data.details)
                : data.details;
          } catch {
            parsedDetails = {};
          }
        }

        console.log("Parsed details:", parsedDetails);
        setProfile({
          trustScore: Number(data.trustScore),
          mail: data?.mail,
          reasons: data?.reasons || [],
          details: {
            walletAge: parsedDetails?.walletAge,
            confidenceScore: parsedDetails?.confidence_score ?? 0,
            totalTransactions: parsedDetails?.txCount,
          },
          timestamp: data?.timestamp,
        });

        setIsVerified(true);
      } catch (err) {
        console.error("BC fetch failed:", err);
        setIsVerified(false);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [address]);

  // ---- LOADING UI (same theme) ----
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <Card className="bg-zinc-900 border border-zinc-800 max-w-sm w-full">
          <CardContent className="p-8 flex flex-col items-center space-y-6">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-700" />
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin" />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-zinc-100">
                Verifying Wallet
              </p>
              <p className="text-xs text-zinc-400">
                Reading trust score from blockchain
              </p>
            </div>

            <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
              <div className="h-full w-1/3 bg-cyan-400 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- NOT VERIFIED UI ----
  if (!isVerified || !profile) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
        <Card className="bg-zinc-900 border border-zinc-800 max-w-md w-full">
          <CardContent className="p-8 text-center space-y-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
              <span className="text-red-400 text-2xl font-bold">!</span>
            </div>

            <h2 className="text-xl font-semibold text-zinc-100">
              User Not Verified
            </h2>

            <p className="text-sm text-zinc-400">
              No valid trust score found for this wallet address.
            </p>

            <div className="mt-4 rounded-lg bg-zinc-800/60 p-3">
              <p className="text-xs text-zinc-400 mb-1">Wallet Address</p>
              <p className="text-xs font-mono text-zinc-200 break-all">
                {address}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- Risk Badge Logic ONLY ----
  let riskLabel = "LOW RISK";
  let riskColor = "#22c55e"; // green

  if (profile.trustScore >= 60 && profile.trustScore < 80) {
    riskLabel = "MEDIUM RISK";
    riskColor = "#eab308"; // yellow
  }

  if (profile.trustScore < 60) {
    riskLabel = "HIGH RISK";
    riskColor = "#ef4444"; // red
  }
  // ---- Circle math (neutral) ----
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (profile.trustScore / 100) * circumference;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* HEADER */}
        <Card className="bg-zinc-900 border border-zinc-800 text-zinc-100">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-400">
                Verified Profile
              </p>
              <h1 className="text-lg font-semibold break-all">{address}</h1>
              <p className="text-sm text-zinc-400 mt-1">{profile.mail}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Trust Circle (NEUTRAL) */}
              <div className="relative h-28 w-28">
                <svg className="h-full w-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="#27272a"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="#38bdf8" // neutral cyan
                    strokeWidth="9"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.6s ease" }}
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-2xl font-semibold"
                    style={{ color: riskColor }}
                  >
                    {profile.trustScore}
                  </span>
                  <span className="text-[10px] uppercase text-zinc-500">
                    Trust
                  </span>
                </div>
              </div>

              {/* RISK BADGE (ONLY THIS CHANGES COLOR) */}
              <span
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  color: riskColor,
                  borderColor: riskColor,
                  backgroundColor: `${riskColor}1A`,
                }}
              >
                {riskLabel}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ["Wallet Age", formatWalletAge(Number(profile.details.walletAge))],
            ["Transactions", profile.details.totalTransactions],
            ["Confidence", `${Math.round(profile.details.confidenceScore)}%`],
          ].map(([label, value]) => (
            <Card
              key={label}
              className="bg-zinc-900 border border-zinc-800 text-zinc-100"
            >
              <CardContent className="p-5">
                <p className="text-xs uppercase text-zinc-400">{label}</p>
                <p className="text-xl font-semibold mt-1">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CONFIDENCE BAR (NEUTRAL) */}
        <Card className="bg-zinc-900 border border-zinc-800 text-zinc-100">
          <CardContent className="p-6">
            {/* Header row */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase text-zinc-400">
                Verification Confidence
              </p>

              <span className="text-sm font-medium text-zinc-200">
                {Math.round(profile.details.confidenceScore)}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full transition-all duration-700 bg-cyan-400"
                style={{
                  width: `${profile.details.confidenceScore}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* REASONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-zinc-900 border border-zinc-800 text-zinc-100">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase text-zinc-300 mb-4">
                Behavioral & Risk Assessment
              </h2>
              <ul className="space-y-3">
                {profile.reasons.map((reason, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-zinc-400" />
                    <span className="text-sm text-zinc-300">{reason}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border border-zinc-800 text-zinc-100">
            <CardContent className="p-6">
              <h2 className="text-sm font-semibold uppercase text-zinc-300 mb-4">
                Verification Metadata
              </h2>
              <p className="text-xs text-zinc-400">Last Updated</p>
              <p className="text-sm mt-1">
                {new Date(profile.timestamp * 1000).toUTCString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
