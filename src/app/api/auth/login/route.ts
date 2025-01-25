import { NextResponse } from "next/server";
import { User } from "@/models/user";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const { email, password, userType } = await request.json();

  try {
    const { data, error } = await db
      .from<User>("users")
      .select((query) =>
        query.eq("email", email).eq("password", password).eq("type", userType)
      );

    if (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: data }, { status: 200 });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { error: "Erro interno: " + errorMessage },
      { status: 500 }
    );
  }
}
