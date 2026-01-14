"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useTrustStore } from "../hooks/useTrustscore";

const Verification = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [score, setScore] = useState<number | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number>(0);
  const [reasons, setReasons] = useState<string[]>([]);
  const { address } = useAccount();
  const setTrustData = useTrustStore((state) => state.setTrustData);

  useEffect(() => {
    if (!address) return;

    const fetchScore = async () => {
      try {
        const { data } = await axios.post("/api/verify/readContract", {
          user: address,
        });

        console.log("Fetched score:", data);

        // ✅ Validate trust score
        if (typeof data?.trustScore !== "number") {
          setIsVerified(false);
          setScore(null);
          setReasons(data?.reasons || ["Invalid trust score"]);
          return;
        }

        setScore(data.trustScore);
        setTrustData(data);
        setIsVerified(true);

        // ✅ Parse details safely
        if (data?.details) {
          try {
            const parsedDetails =
              typeof data.details === "string"
                ? JSON.parse(data.details)
                : data.details;

            setConfidenceScore(parsedDetails?.confidence_score ?? 0);
          } catch (err) {
            console.error("Failed to parse details:", err);
            setConfidenceScore(0);
          }
        }

        setReasons(data?.reasons || []);
      } catch (error) {
        console.error("Error fetching score:", error);
        setIsVerified(false);
        setScore(null);
        setConfidenceScore(0);
        setReasons(["Unable to fetch verification data"]);
      }
    };

    fetchScore();
  }, [address, setTrustData]);

  return (
    <>
      <p className="text-xs sm:text-sm text-zinc-400">AI Trust Score</p>

      <div className="flex items-end gap-3 sm:gap-4 mt-2">
        <span className="text-5xl sm:text-7xl font-bold text-cyan-400">
          {isVerified && score !== null ? score : "--"}
        </span>
        <span className="text-zinc-400 mb-1 sm:mb-2">/100</span>
      </div>

      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-400">
        Confidence: {confidenceScore}%
      </p>
      {reasons.length > 0 && (
        <ul
          className={`mt-4 z-10 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2
          text-xs sm:text-sm leading-relaxed
          ${
            score !== null && score >= 80
              ? "text-green-400"
              : score !== null && score >= 60
              ? "text-yellow-400"
              : "text-red-400"
          }
        `}
        >
          {reasons.map((reason, index) => (
            <li
              key={index}
              className="
              relative pl-4
              transition-colors duration-200
              before:absolute before:left-0 before:top-2
              before:h-1.5 before:w-1.5 before:rounded-full
              before:bg-current
              hover:text-opacity-90
            "
            >
              {reason}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Verification;
