export interface Category extends Record<string, unknown> {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
