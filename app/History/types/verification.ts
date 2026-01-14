// types/verification.ts
export interface VerificationHistory {
  trustScore: number;
  mail: string;
  reasons: string[]; // exactly 4 values
  details: {
    walletAge: string;
    confidenceScore: number;
    totalTransactions: number;
  };
  timestamp: number; // Unix timestamp like 1768358912
}
