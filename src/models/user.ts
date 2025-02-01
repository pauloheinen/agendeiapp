export interface User extends Record<string, unknown> {
  id: string;
  email: string;
  name: string;
  type: 0 | 1; // 0: common, 1: admin
  ref_provider: number;
  created_at: Date;
  updated_at: Date;
}
