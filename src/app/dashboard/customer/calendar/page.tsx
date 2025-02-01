"use client";
import { useSearchParams } from "next/navigation";
import { Calendar } from "@/components/calendar";

export default function Agenda() {
  const searchParams = useSearchParams();
  const providerId = searchParams.get("providerId");

  return (
    <div className="page-container">
      <div className="card w-full max-w-4xl">
        <h1 className="card-title">Selecione uma Data</h1>
        <Calendar providerId={providerId} />
      </div>
    </div>
  );
}
