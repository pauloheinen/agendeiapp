import { useState } from "react";
import { User } from "@/models/user";

interface UseAuth {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, userType: string) => Promise<void>;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, userType: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setUser(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login };
}
