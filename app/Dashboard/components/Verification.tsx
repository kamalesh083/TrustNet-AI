"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Verification = () => {
  const [isVerified, setIsVerified] = useState<boolean>(true);
  const [score, setScore] = useState<number | null>(null);
  const { address } = useAccount(); // Assuming `useAccount` provides the `address`

  useEffect(() => {
    const fetchScore = async () => {
      if (address) {
        try {
          const response = await axios.post("/api/verify/readContract", {
            user: address,
          });
          if (!response.data || typeof response.data.score !== "number") {
            setIsVerified(false);
          }
          setScore(response.data.trustScore);
          console.log("Fetched score:", response.data);
          setIsVerified(true);
        } catch (error) {
          console.error("Error fetching score:", error);
        }
      }
    };

    fetchScore();
  }, [address]);

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
        Confidence: 92%
      </p>
    </>
  );
};

export default Verification;
