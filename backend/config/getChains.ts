import { CHAINS } from "./chains";

export function getChains(chainId?: number): string {
  if (!chainId) return "unknown";
  return CHAINS[chainId as keyof typeof CHAINS]?.name ?? "unknown";
}
