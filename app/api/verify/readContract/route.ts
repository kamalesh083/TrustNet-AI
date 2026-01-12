import { readContract } from "@/app/Verify/lib/readContract";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = body;

  // ✅ HARD GUARD (THIS IS THE FIX)
  if (!user || typeof user !== "string") {
    return new Response(
      JSON.stringify({ success: false, error: "Wallet not connected" }),
      { status: 400 }
    );
  }

  try {
    const result = await readContract(user);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in /api/verify/readContract:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
