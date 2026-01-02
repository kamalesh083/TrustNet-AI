type InteractionType = "TRANSFER" | "ERC20" | "NFT" | "DEFI" | "CONTRACT";

export function classifyTransaction(input: string): InteractionType {
  if (!input || input === "0x") return "TRANSFER";

  const selector = input.slice(0, 10);

  switch (selector) {
    case "0xa9059cbb":
      return "ERC20";

    case "0x23b872dd":
    case "0x42842e0e":
    case "0xf242432a":
      return "NFT";

    default:
      return "DEFI";
  }
}
