import { fetchTransactions } from "@/backend/services/transaction.services";
import { featureEngineering } from "@/backend/utils/featureEngineering";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address, chainId } = await req.json();

    if (!address || !chainId) {
      return NextResponse.json(
        { error: "address and chainId are required" },
        { status: 400 }
      );
    }

    const transactions = await fetchTransactions(address, chainId);

    const features = await featureEngineering(transactions, address);

    return NextResponse.json({ features });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch transactions or process features." },
      { status: 500 }
    );
  }
}
