import { NextResponse } from "next/server";
import axios from "axios";
import { ETHERSCAN_V2_API } from "@/backend/config/etherscan";

export async function POST(req: Request) {
  try {
    const { address, chainId } = await req.json();

    if (!address || !chainId) {
      return NextResponse.json(
        { error: "address and chainId are required" },
        { status: 400 }
      );
    }

    const response = await axios.get(ETHERSCAN_V2_API, {
      params: {
        chainid: Number(chainId),
        module: "account",
        action: "txlist",
        address,
        startblock: 0,
        endblock: 99999999,
        sort: "asc",
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });

    if (
      response.data.status !== "1" ||
      !response.data.result ||
      response.data.result.length === 0
    ) {
      return NextResponse.json([]); // 👈 important
    }

    // ✅ only last 3 transactions
    const lastThree = response.data.result.slice(-3).reverse();

    return NextResponse.json(lastThree);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
