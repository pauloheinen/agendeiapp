import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Category } from "@/models/category";

export async function GET() {
  try {
    const { data, error } = await db
      .from<Category>("categories")
      .select((query) => query);

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

    const response = NextResponse.json({ categories: data }, { status: 200 });
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
