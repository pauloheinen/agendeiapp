export interface User extends Record<string, unknown> {
  id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  type: "provider" | "customer";
}
