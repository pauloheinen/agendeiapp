import { supabase } from "./supabase";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

type DbResponse<T> = {
  data: T[] | null;
  error: unknown | null;
  count?: number;
};

type QueryFunction<T extends Record<string, unknown>> = (
  builder: PostgrestFilterBuilder<never, T, unknown>
) => PostgrestFilterBuilder<never, T, unknown>;

export const db = {
  from: <T extends Record<string, unknown>>(table: string) => ({
    select: async (queryFn?: QueryFunction<T>): Promise<DbResponse<T>> => {
      console.log(`[DB] Starting query on table: ${table}`);
      const startTime = performance.now();

      try {
        const builder = supabase.from(table).select("*");
        const finalQuery = queryFn ? queryFn(builder) : builder;

        const { data, error } = await finalQuery;

        const endTime = performance.now();
        console.log(
          `[DB] Query completed in ${(endTime - startTime).toFixed(2)}ms`
        );
        console.log("[DB] Query result:", { data, error });

        return { data: data as T[] | null, error };
      } catch (err) {
        console.error("[DB] Query error:", err);
        return {
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        };
      }
    },

    insert: async (payload: Partial<T>): Promise<DbResponse<T>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .insert(payload)
          .select();
        return { data, error };
      } catch (err) {
        console.error("[DB] Insert error:", err);
        return {
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        };
      }
    },

    update: async (
      match: Partial<T>,
      payload: Partial<T>
    ): Promise<DbResponse<T>> => {
      try {
        const { data, error } = await supabase
          .from(table)
          .update(payload)
          .match(match)
          .select();
        return { data, error };
      } catch (err) {
        console.error("[DB] Update error:", err);
        return {
          data: null,
          error: err instanceof Error ? err : new Error(String(err)),
        };
      }
    },
  }),
};
