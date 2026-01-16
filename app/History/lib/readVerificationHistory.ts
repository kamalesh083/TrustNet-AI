import { getContract } from "./contract";
import { VerificationHistory } from "../types/verification";
import { transformProfile } from "./transformProfile";

export async function fetchVerificationHistory(
  user: string
): Promise<VerificationHistory[]> {
  const contract = getContract();

  const count: bigint = await contract.getProfileCount(user);

  const history: VerificationHistory[] = [];

  for (let i = 0; i < Number(count); i++) {
    const rawProfile = await contract.getProfileByIndex(user, i);
    history.push(transformProfile(rawProfile)); // ✅ reuse
  }

  return history.reverse();
}
