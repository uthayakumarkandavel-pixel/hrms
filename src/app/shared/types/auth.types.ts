export type DemoRole = 'admin' | 'user';

export interface DemoLoginUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: DemoRole;
}
