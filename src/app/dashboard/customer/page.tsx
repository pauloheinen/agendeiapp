"use client";
import { useState } from "react";

import EventList from "../components/eventlist";
import CategoriesList from "../components/categoriesList";

export default function CustomerDashboard() {
  const [activeView, setActiveView] = useState<"events" | "booking">("events");

  return (
    <main className="page-container">
      <div className="card w-full max-w-4xl">
        <h1 className="card-title">Agendamentos</h1>

        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <button
              onClick={() => setActiveView("events")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors
                ${
                  activeView === "events"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
            >
              Meus Eventos
            </button>
            <button
              onClick={() => setActiveView("booking")}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors
                ${
                  activeView === "booking"
                    ? "bg-green-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
            >
              Agendar
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 min-h-[400px] border border-gray-700">
            {activeView === "events" ? <EventList /> : <CategoriesList />}
          </div>
        </div>
      </div>
    </main>
  );
}
