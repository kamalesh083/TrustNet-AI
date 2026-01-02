import axios from "axios";
import { ETHERSCAN_V2_API } from "../config/etherscan";

export async function fetchTransactions(
  address: `0x${string}`,
  chainId: number
) {
  const response = await axios.get(ETHERSCAN_V2_API, {
    params: {
      chainid: Number(chainId),
      module: "account",
      action: "txlist",
      address,
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });

  if (response.data.status !== "1") {
    throw new Error(response.data.message || "Etherscan V2 error");
  }

  return response.data.result;
}
