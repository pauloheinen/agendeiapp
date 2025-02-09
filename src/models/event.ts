export interface Event extends Record<string, unknown> {
  id: string;
  provider_id: number;
  user_id: number;
  title: string;
  date: Date;
  status: EventStatus;
  created_at: Date;
  updated_at: Date;
}

export enum EventStatus {
  PENDENTE = 1,
  CONFIRMADO = 2,
  CANCELADO = 3,
}
