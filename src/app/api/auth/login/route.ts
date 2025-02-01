import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await db
      .from<User>("users")
      .select((query) => query.eq("email", email).eq("password", password));

    if (error) {
      console.log("Route: Returning error response:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    const response = NextResponse.json({ user: data[0] }, { status: 200 });
    return response;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { error: "Erro interno: " + errorMessage },
      { status: 500 }
    );
  }
}
