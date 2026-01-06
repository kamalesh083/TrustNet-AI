"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useAccount } from "wagmi";

const VerifyButton = () => {
  const { isConnected } = useAccount();

  // 🔒 DISABLED (wallet not connected)
  if (!isConnected) {
    return (
      <div className="relative group inline-block">
        <Button
          className="
            cursor-not-allowed
            opacity-60
          "
        >
          <span
            className="
              w-fit px-4 py-1 text-xs sm:text-sm rounded-md
              bg-green-500/20 text-green-400
              border border-green-500/20
            "
          >
            VERIFY
          </span>
        </Button>

        {/* Tooltip */}
        <div
          className="
            pointer-events-none
            absolute left-1/2 -translate-x-1/2
            top-full mt-2
            whitespace-nowrap
            rounded-md
            bg-black/90
            px-3 py-1.5
            text-xs text-white
            opacity-0 scale-95
            transition-all duration-200
            group-hover:opacity-100 group-hover:scale-100
          "
        >
          Connect wallet to continue
        </div>
      </div>
    );
  }

  // ✅ ENABLED (wallet connected)
  return (
    <Link href="/Verify">
      <Button>
        <span
          className="
            w-fit px-4 py-1 text-xs sm:text-sm rounded-md
            bg-green-500/20 text-green-400
            border border-green-500/20
          "
        >
          VERIFY
        </span>
      </Button>
    </Link>
  );
};

export default VerifyButton;
