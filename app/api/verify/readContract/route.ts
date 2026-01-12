import { readContract } from "@/app/Verify/lib/readContract";

export async function POST(req: Request) {
  const body = await req.json();
  const { user } = body;
  try {
    const result = await readContract(user as `0x${string}`);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in /api/verify/readContract:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
