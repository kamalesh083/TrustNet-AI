/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerificationHistory } from "../types/verification";
import { decrypt } from "@/app/Verify/lib/crypto";

function formatWalletAge(days: number): string {
  if (!days || isNaN(days)) return "N/A";

  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);

  if (years > 0) return `${years}y ${months}m`;
  return `${months}m`;
}

export function transformProfile(raw: any): VerificationHistory {
  const [
    trustScore,
    encryptedEmail,
    encryptedReasons,
    encryptedDetails,
    timestamp,
  ] = raw;

  const parsedDetails = JSON.parse(decrypt(encryptedDetails));

  // 🔒 Normalize confidence score HERE
  const confidence =
    parsedDetails.confidenceScore ?? parsedDetails.confidence_score ?? 0;

  return {
    trustScore: Number(trustScore),
    mail: decrypt(encryptedEmail),
    reasons: JSON.parse(decrypt(encryptedReasons)),

    details: {
      walletAge: formatWalletAge(parsedDetails.walletAge),
      confidenceScore: Number(confidence), // ALWAYS 0–1
      totalTransactions: Number(parsedDetails.txCount ?? 0),
    },

    timestamp: Number(timestamp),
  };
}
