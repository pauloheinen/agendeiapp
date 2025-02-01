"use client";

import { Event } from "@/models/event";

export default function EventList() {
  const events: Event[] = [];

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="text-lg font-medium text-white">{event.title}</h3>
            <p className="text-gray-300">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              event.status === "confirmed"
                ? "bg-green-500/20 text-green-300"
                : event.status === "pending"
                  ? "bg-yellow-500/20 text-yellow-300"
                  : "bg-red-500/20 text-red-300"
            }`}
          >
            {event.status}
          </span>
        </div>
      ))}
    </div>
  );
}
