export type UserRole = 'admin' | 'user';

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  adminId?: string;
}
