import { ethers } from "ethers";
import abi from "@/contract/trustNetABI.json";

const RPC_URL = process.env.AMOY_RPC_URL!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

export function getContract() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

  return contract;
}
