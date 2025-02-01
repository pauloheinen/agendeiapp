export interface Event extends Record<string, unknown> {
  id: string;
  title: string;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}
