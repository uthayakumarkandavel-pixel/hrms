export type BadgeStatus = 'Earned' | 'In Progress' | 'Locked';
export interface Badge {
  name: string;
  duration: string;
  description: string;
  icon: string;
  status: BadgeStatus;
  progress: number;
  current: number;
  target: number;
}
export interface BadgeHistory {
  name: string;
  description: string;
  awardedBy: string;
  date: string;
  icon: string;
}
