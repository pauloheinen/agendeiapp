import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Provider } from "@/models/provider";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = Number(searchParams.get("categoryId"));

    const { data, error } = await db
      .from<Provider>("providers")
      .select((query) =>
        query
          .eq("category_id", categoryId)
          .order("rating", { ascending: false })
      );

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

    const response = NextResponse.json({ providers: data }, { status: 200 });
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
