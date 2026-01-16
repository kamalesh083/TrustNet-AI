import { VerificationHistory } from "@/app/History/types/verification";

export const dummyProfile: VerificationHistory = {
  trustScore: 82,
  mail: "verified.user@organization.com",
  reasons: [
    "Consistent on-chain behavior",
    "No interaction with flagged contracts",
    "Wallet age exceeds 18 months",
    "Stable transaction frequency",
  ],
  details: {
    walletAge: "1 year 8 months",
    confidenceScore: 0.82,
    totalTransactions: 438,
  },
  timestamp: 1768358912,
};
