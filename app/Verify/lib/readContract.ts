import { ethers } from "ethers";
import trustNetABI from "@/contract/trustNetABI.json";
import { decrypt } from "./crypto";

const contractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;
const rpcUrl = process.env.AMOY_RPC_URL || "";

if (!contractAddress) {
  throw new Error("CONTRACT_ADDRESS is not defined in environment variables");
}

if (!rpcUrl) {
  throw new Error("AMOY_RPC_URL is not defined in environment variables");
}

const provider = new ethers.JsonRpcProvider(rpcUrl);

const contract = new ethers.Contract(contractAddress, trustNetABI, provider);

export async function readContract(user: `0x${string}`) {
  try {
    const [
      trustScore,
      encryptedEmail,
      encryptedReasons,
      encryptedDetails,
      timestamp,
    ] = await contract.getLatestProfile(user);

    const email = decrypt(encryptedEmail);
    const reasons = JSON.parse(decrypt(encryptedReasons));
    let details;
    if (encryptedDetails) {
      details = decrypt(encryptedDetails);
    }

    return {
      trustScore: Number(trustScore),
      email,
      reasons,
      details,
      timestamp: Number(timestamp),
    };
  } catch (error) {
    console.error("Error reading contract:", error);
    throw error;
  }
}
