import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "Square payment is disabled in Tu Vi So. Checkout is handled by Printerval.",
    },
    { status: 501 },
  );
}
