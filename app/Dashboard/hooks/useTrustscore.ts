/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type TrustState = {
  trustScore: number | null;
  details: any;
  reasons: string[];
  setTrustData: (data: {
    trustScore: number;
    details?: any;
    reasons?: string[];
  }) => void;
};

export const useTrustStore = create<TrustState>((set) => ({
  trustScore: null,
  details: null,
  reasons: [],

  setTrustData: (data) =>
    set({
      trustScore: data.trustScore,
      details: data.details ?? null,
      reasons: data.reasons ?? [],
    }),
}));
