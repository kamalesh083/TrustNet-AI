import { ethers } from "ethers";
import trustNetABI from "@/contract/trustNetABI.json";
import { encrypt } from "./crypto";

const contractAddress = process.env.CONTRACT_ADDRESS as `0x${string}`;
const rpcUrl = process.env.AMOY_RPC_URL || "";
const verifierPrivateKey = process.env.VERIFIER_PRIVATE_KEY || "";

if (!contractAddress) {
  throw new Error("CONTRACT_ADDRESS is not defined in environment variables");
}
console.log("Contract Address:", contractAddress);
if (!rpcUrl) {
  throw new Error("AMOY_RPC_URL is not defined in environment variables");
}
console.log("RPC URL:", rpcUrl);

if (!verifierPrivateKey) {
  throw new Error(
    "VERIFIER_PRIVATE_KEY is not defined in environment variables"
  );
}
console.log("private Key : ", verifierPrivateKey);

const provider = new ethers.JsonRpcProvider(rpcUrl);

const wallet = new ethers.Wallet(verifierPrivateKey);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(contractAddress, trustNetABI, signer);

export async function writeContract(
  user: `0x${string}`,
  trustScore: number,
  email: string,
  reasons: string[],
  details: string
) {
  const encryptedEmail = encrypt(email);
  const encryptedReasons = encrypt(JSON.stringify(reasons));
  const encryptedDetails = encrypt(details);
  {
    try {
      const tx = await contract.storeProfile(
        user,
        trustScore,
        encryptedEmail,
        encryptedReasons,
        encryptedDetails
      );
      await tx.wait();
      return { success: true, txHash: tx.hash };
    } catch (error) {
      console.error("Error writing to contract:", error);
      return { success: false, error };
    }
  }
}
