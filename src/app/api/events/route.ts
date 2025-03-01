import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Event } from "@/models/event";

export async function POST(request: Request) {
  try {
    const eventData: Event = await request.json();

    if (!eventData.provider_id || !eventData.user_id || !eventData.date) {
      return NextResponse.json(
        { error: "Dados incompletos para criar evento" },
        { status: 400 }
      );
    }

    const { data, error } = await db.from("events").insert({
      provider_id: eventData.provider_id,
      user_id: eventData.user_id,
      title: eventData.title,
      date: eventData.date,
      status: eventData.status,
    });

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Erro ao criar evento no banco de dados" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Evento criado com sucesso",
        event: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { message: "Erro ao processar a solicitação de criação de evento" },
      { status: 500 }
    );
  }
}
