import { NextResponse } from "next/server";
import { getFeature } from "../../Verify/utils/gemini";

export async function POST(req: Request) {
  const shapData = await req.json();

  const explanation = await getFeature(shapData);

  return NextResponse.json({
    explanation,
  });
}
