"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const router = useRouter();

  const { login, loading, error } = useAuth();
  const [userType, setUserType] = useState<"provider" | "customer">();
  const [submitting, setSubmitting] = useState(false);
  const [showTypeError, setShowTypeError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userType) {
      setShowTypeError(true);
      return;
    }

    setSubmitting(true);

    try {
      const form = e.currentTarget;
      const email = (form.elements.namedItem("email") as HTMLInputElement)
        .value;
      const password = (form.elements.namedItem("password") as HTMLInputElement)
        .value;

      const userData = await login(email, password, userType);

      if (userData) {
        router.push(`/dashboard/${userType}`);
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="page-container">
      <div className="card">
        <h1 className="card-title">agendei.app</h1>

        <div className="form">
          <p className="text-gray-300">Quero:</p>
          <div className="flex flex-row gap-4">
            <button
              type="button"
              className={`btn-primary flex-1 ${
                userType === "provider" ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => {
                setUserType("provider");
                setShowTypeError(false);
              }}
            >
              oferecer serviços
            </button>
            <button
              type="button"
              className={`btn-success flex-1 ${
                userType === "customer" ? "ring-2 ring-green-500" : ""
              }`}
              onClick={() => {
                setUserType("customer");
                setShowTypeError(false);
              }}
            >
              agendar serviços
            </button>
          </div>
          {showTypeError && (
            <p className="text-red-500 text-sm text-center">
              Selecione uma opção acima
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            className="input"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading || submitting || !userType}
          >
            {loading || submitting ? "Carregando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
