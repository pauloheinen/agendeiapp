"use client";

import { Calendar } from "@/components/calendar";
import { useProvider } from "@/contexts/ProviderContext";

export default function CalendarPage() {
  const { selectedProvider } = useProvider();

  if (!selectedProvider) {
    return <div>Nenhum prestador selecionado</div>;
  }

  return (
    <main className="page-container">
      <div className="card w-full max-w-4xl">
        <div className="mb-8">
          <h1 className="card-title mb-2">Agendar Horário</h1>
          <p className="text-gray-400">
            Agendando com:{" "}
            <span className="text-white">{selectedProvider.name}</span>
          </p>
        </div>
        <Calendar provider={selectedProvider} />
      </div>
    </main>
  );
}
