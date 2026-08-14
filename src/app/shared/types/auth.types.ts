export type DemoRole = 'admin' | 'user';

export interface DemoLoginUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: DemoRole;
}


export interface AuthUser {
  id: string;
  name?: string;
  role: DemoRole;
}