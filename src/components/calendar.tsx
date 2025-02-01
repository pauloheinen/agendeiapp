"use client";
import { useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";
import { ptBR } from "date-fns/locale";

interface CalendarProps {
  providerId: string | null;
}

export function Calendar({ providerId }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(addMonths(currentDate, -1));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {format(currentDate, "MMMM yyyy", { locale: ptBR })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-400 hover:text-white"
          >
            ←
          </button>
          <button
            onClick={nextMonth}
            className="p-2 text-gray-400 hover:text-white"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-400 p-2"
          >
            {day}
          </div>
        ))}

        {monthDays.map((day, _) => (
          <button
            key={day.toString()}
            onClick={() => setSelectedDate(day)}
            disabled={!isSameMonth(day, currentDate)}
            className={`
              p-2 text-sm rounded-lg
              transition-colors
              ${
                isToday(day)
                  ? "bg-blue-500/20 text-blue-400"
                  : isSameMonth(day, currentDate)
                    ? "hover:bg-gray-700"
                    : "text-gray-600 cursor-not-allowed"
              }
              ${
                selectedDate && day.getTime() === selectedDate.getTime()
                  ? "bg-blue-500 text-white"
                  : ""
              }
            `}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">
            Horários disponíveis para{" "}
            {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
              (time) => (
                <button
                  key={time}
                  className="p-2 text-sm bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {time}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
