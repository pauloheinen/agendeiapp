"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useAuth } from "@/contexts/AuthContext";
import { EventStatus } from "@/models/event";

interface CalendarProps {
  provider: Provider | null;
}

export function Calendar({ provider: data }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(addMonths(currentDate, -1));

  const handleConfirmAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Por favor, selecione uma data e um horário para agendar.");
      return;
    }

    if (!user) {
      setError("Você precisa estar logado para fazer um agendamento.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const appointmentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
        parseInt(selectedTime.split(":")[0]),
        parseInt(selectedTime.split(":")[1])
      );

      const eventData = {
        provider_id: data!.id,
        user_id: user.id,
        title: `Agendamento com ${data!.name}`,
        date: appointmentDate.toISOString(),
        status: EventStatus.PENDENTE,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Erro ao criar agendamento");
      }

      setSuccess(true);
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível realizar o agendamento. Por favor, tente novamente."
      );
      console.error("Appointment error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-medium text-white mb-4">
              Agendamento Confirmado!
            </h3>
            <p className="text-gray-300 mb-6">
              Seu agendamento foi realizado com sucesso. Você receberá uma
              confirmação em breve.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Ir para Dashboard
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-400">{error}</p>
        </div>
      )}

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
              <button
                className={`
                  mt-4 w-full py-3 px-4 
                  font-medium rounded-lg transition-colors
                  ${
                    isSubmitting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-500 text-white"
                  }
                `}
                onClick={handleConfirmAppointment}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processando..." : "Confirmar Agendamento"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
