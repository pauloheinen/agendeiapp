"use client";

import { Calendar } from "@/components/calendar";
import { useProvider } from "@/contexts/ProviderContext";
import { useRouter } from "next/navigation";

export default function CalendarPage() {
  const { selectedProvider } = useProvider();
  const router = useRouter();

  if (!selectedProvider) {
    return <div>Nenhum prestador selecionado</div>;
  }

  return (
    <main className="page-container">
      <div className="card w-full max-w-4xl">
        <div className="mb-8">
          <div className="relative flex items-center justify-center">
            <button
              onClick={() => router.back()}
              className="absolute left-0 text-gray-400 hover:text-white transition-colors"
            >
              Voltar
            </button>

            <h1 className="card-title mb-0">Agendar Horário</h1>
          </div>
          <p className="text-gray-400 mt-2">
            <span className="text-white">{selectedProvider.name}</span>
          </p>
        </div>
        <Calendar provider={selectedProvider} />
      </div>
    </main>
  );
}
