/* eslint-disable @typescript-eslint/no-explicit-any */
import { VerificationHistory } from "../types/verification";
import { decrypt } from "@/app/Verify/lib/crypto";

export function transformProfile(raw: any): VerificationHistory {
  const [
    trustScore,
    encryptedEmail,
    encryptedReasons,
    encryptedDetails,
    timestamp,
  ] = raw;

  return {
    trustScore: Number(trustScore),
    mail: decrypt(encryptedEmail),
    reasons: JSON.parse(decrypt(encryptedReasons)),
    details: JSON.parse(decrypt(encryptedDetails)),
    timestamp: Number(timestamp),
  };
}
