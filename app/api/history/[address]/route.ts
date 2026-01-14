import { fetchVerificationHistory } from "@/app/History/lib/readVerificationHistory";

export async function GET(
  req: Request,
  context: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await context.params; // ✅ await params
    const data = await fetchVerificationHistory(address);
    return Response.json(data);
  } catch (e) {
    console.error(e);
    return new Response("Failed to load verification history", {
      status: 500,
    });
  }
}
