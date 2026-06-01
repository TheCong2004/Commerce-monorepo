"use client";

import { useSearchParams } from "next/navigation";
import TuViAiChart from "@/features/tu-vi/components/TuViAiChart";

export default function TuViLaSoPage() {
  const searchParams = useSearchParams();

  const input = {
    fullName: searchParams.get("name") || "Ngô Hà",
    gender: searchParams.get("gender") || "Nam",
    day: Number(searchParams.get("day") || 1),
    month: Number(searchParams.get("month") || 1),
    year: Number(searchParams.get("year") || 1990),
    hour: Number(searchParams.get("hour") || 0),
    minute: Number(searchParams.get("minute") || 0),
    viewYear: Number(searchParams.get("viewYear") || 2025),
  };

  return <TuViAiChart input={input} />;
}
