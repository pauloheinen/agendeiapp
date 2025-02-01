export interface Provider {
  id: number;
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
