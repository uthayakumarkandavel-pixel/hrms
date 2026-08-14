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
  date: string;
  icon: string;
}
export interface RecognitionUserData {
  badges: Badge[];
  history: BadgeHistory[];
}

export interface RecognitionData {
  users: Record<string, RecognitionUserData>;
}