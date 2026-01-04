"use client";

import { Copy, Check } from "lucide-react";
import { useState, useMemo } from "react";

interface VerifyLinkProps {
  verifyId: string;
}

export default function VerifyLink({ verifyId }: VerifyLinkProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = useMemo(
    () => `https://trust-net-ai.vercel.app/verify/${verifyId}`,
    [verifyId]
  );

  const shortUrl = useMemo(
    () => `https://trust-net-ai.vercel.app/...../${verifyId.slice(-5)}`,
    [verifyId]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="
        flex items-center justify-between
        gap-3 max-w-full
        rounded-md bg-black/40
        px-3 py-2
        border border-cyan-500/20
      "
    >
      {/* Short URL */}
      <span className="truncate text-xs sm:text-sm text-cyan-300">
        {shortUrl}
      </span>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        aria-label="Copy verification link"
        className="relative shrink-0 w-5 h-5 cursor-pointer"
      >
        {/* Copy Icon */}
        <Copy
          className={`
            absolute inset-0 w-5 h-5
            text-cyan-300
            transition-all duration-200
            ${copied ? "scale-0 opacity-0" : "scale-100 opacity-100"}
          `}
        />

        {/* Check Icon */}
        <Check
          className={`
            absolute inset-0 w-5 h-5
            text-emerald-400
            transition-all duration-200
            ${copied ? "scale-100 opacity-100" : "scale-0 opacity-0"}
          `}
        />
      </button>
    </div>
  );
}
