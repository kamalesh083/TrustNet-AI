export default function addrRed(address?: `0x${string}`): string {
  if (!address) return "Not connected";
  return `${address.slice(0, 9)}...${address.slice(-4)}`;
}
