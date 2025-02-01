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
import { Provider } from "@/models/provider";

interface CalendarProps {
  provider: Provider | null;
}

export function Calendar({ provider: data }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

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

        {monthDays.map((day) => (
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
        <div className="mt-6 space-y-6">
          <h3 className="text-xl font-medium text-white mb-4">
            Horários disponíveis para{" "}
            {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })}
          </h3>

          <div className="grid grid-cols-4 gap-3">
            {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map(
              (time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`
                    py-3 px-4
                    text-base font-medium
                    rounded-lg
                    transition-all duration-200
                    ${
                      selectedTime === time
                        ? "bg-blue-500 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-gray-800"
                        : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    }
                  `}
                >
                  {time}
                </button>
              )
            )}
          </div>

          {selectedTime && (
            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
              <p className="text-gray-200 text-base">
                Você está agendando para: {data?.name}
                <span className="block mt-2 text-lg font-medium text-white">
                  {format(selectedDate, "dd 'de' MMMM", { locale: ptBR })} às{" "}
                  {selectedTime}
                </span>
              </p>
              <button className="mt-4 w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-600 transition-colors">
                Confirmar Agendamento
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
