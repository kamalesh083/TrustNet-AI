import { getContract } from "./contract";
import { decrypt } from "@/app/Verify/lib/crypto";
import { VerificationHistory } from "../types/verification";

export async function fetchVerificationHistory(
  user: string
): Promise<VerificationHistory[]> {
  const contract = getContract();

  const count: bigint = await contract.getProfileCount(user);

  const history: VerificationHistory[] = [];

  for (let i = 0; i < Number(count); i++) {
    const [
      trustScore,
      encryptedEmail,
      encryptedReasons,
      encryptedDetails,
      timestamp,
    ] = await contract.getProfileByIndex(user, i);

    history.push({
      trustScore: Number(trustScore),
      mail: decrypt(encryptedEmail),
      reasons: JSON.parse(decrypt(encryptedReasons)),
      details: JSON.parse(decrypt(encryptedDetails)),
      timestamp: Number(timestamp),
    });
  }

  return history.reverse(); // newest first (optional)
}
