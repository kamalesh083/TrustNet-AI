import { writeContract } from "@/app/Verify/lib/writeContract";

export async function POST(req: Request) {
  const body = await req.json();
  const { user, trustScore, email, reasons, details } = body;
  try {
    const result = await writeContract(
      user,
      trustScore,
      email,
      reasons,
      details
    );
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error("Error in /api/verify/writeContract:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
