"use client";

import { useState } from "react";

const Verification = () => {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  return (
    <>
      <p className="text-xs sm:text-sm text-zinc-400">AI Trust Score</p>

      <div className="flex items-end gap-3 sm:gap-4 mt-2">
        <span className="text-5xl sm:text-7xl font-bold text-cyan-400">
          {isVerified ? "95" : "--"}
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
