/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { encrypt } from "../lib/crypto";

export async function verifyProfileAction({
  email,
  address,
  trustScore,
  reasons,
}: {
  email: string;
  address: string;
  trustScore: number;
  reasons: string[];
}) {
  // ✅ encryption happens safely on server
  const encryptedEmail = encrypt(email);
  const encryptedReasons = encrypt(JSON.stringify(reasons));

  // 🔗 later: blockchain write here
  // storeProfile(address, trustScore, encryptedEmail, ...)

  return {
    success: true,
    encryptedEmail,
    encryptedReasons,
  };
}
