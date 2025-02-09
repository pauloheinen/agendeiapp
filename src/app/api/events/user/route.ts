import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Event } from "@/models/event";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = Number(searchParams.get("userId"));

    if (!userId) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const { data, error, count } = await db
      .from<Event>("events")
      .select((query) =>
        query
          .eq("user_id", userId)
          .order("date", { ascending: false })
          .range(offset, offset + limit - 1)
      );

    if (error) {
      console.log("Route: Returning error response:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    const hasMore = count ? offset + limit < count : false;
    const response = NextResponse.json({
      events: data,
      hasMore,
      total: count,
    });

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
