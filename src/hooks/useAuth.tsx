import { useState } from "react";
import { User } from "@/models/user";

interface UseAuth {
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: string) => Promise<User>;
}

export function useAuth(): UseAuth {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, userType: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      return data.user;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
}
