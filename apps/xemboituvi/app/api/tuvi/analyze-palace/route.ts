import { NextResponse } from "next/server";
import { buildTuViPalaceAnalysis } from "@/features/tu-vi/services/tuvi-ai-analysis";
import type { TuViAiChartInput, TuViPalace } from "@/features/tu-vi/services/tuvi-ai-chart";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { input?: TuViAiChartInput; palace?: TuViPalace };
    if (!body.input || !body.palace) {
      return NextResponse.json({ error: "Missing input or palace" }, { status: 400 });
    }

    return NextResponse.json({
      analysis: buildTuViPalaceAnalysis(body.input, body.palace),
    });
  } catch {
    return NextResponse.json({ error: "Unable to analyze palace" }, { status: 500 });
  }
}
