export interface Provider extends Record<string, unknown> {
  id: string;
  name: string;
  description?: string;
  phone?: string;
  address?: string;
  category_id: number;
  rating: number;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}
