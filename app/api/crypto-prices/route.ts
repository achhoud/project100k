import { NextResponse } from "next/server";
import { getCryptoPrices } from "@/lib/coingecko";

export const revalidate = 60;

export async function GET() {
  try {
    const prices = await getCryptoPrices();

    return NextResponse.json(prices, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Crypto-prijzen ophalen mislukt:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "De actuele cryptoprijzen konden niet worden opgehaald.",
      },
      {
        status: 503,
      },
    );
  }
}