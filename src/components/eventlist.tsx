"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Event, EventStatus } from "@/models/event";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EventList() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      if (authLoading) return;

      if (!user) {
        console.log("Usuário não encontrado");
        router.push("/");
        return;
      }

      try {
        console.log("Fetching events for user:", user.id);
        const response = await fetch(`/api/events/user?userId=${user.id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const { events } = await response.json();
        setEvents(events);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return <div>Carregando eventos...</div>;
  }

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-700 p-2 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-sm text-white">{event.title}</h3>
            <p className="text-gray-300">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              event.status === EventStatus.CONFIRMADO
                ? "bg-green-500/20 text-green-300"
                : event.status === EventStatus.PENDENTE
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            {event.status}
          </span>
        </div>
      ))}

      {events.length === 0 && (
        <div className="text-center text-gray-400">
          Nenhum evento encontrado
        </div>
      )}
    </div>
  );
}
