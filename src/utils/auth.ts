import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const JWT_SECRET = process.env.JWT_SECRET || "chavedefault";

interface JWTPayload {
  userId: string;
  email: string;
  type: string;
  iat: number;
  exp: number;
}

export async function verifyAuth() {
  try {
    const token = (await cookies()).get("auth-token")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";

    return errorMessage;
  }
}
