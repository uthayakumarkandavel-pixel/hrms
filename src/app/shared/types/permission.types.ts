export type PermissionStatus = 'Pending' | 'Approved' | 'Rejected';
export interface PermissionRequest {
  id: string;
  userId: string;
  date: string;
  hours: number;
  reason: string;
  status: PermissionStatus;
}
export interface PermissionRequestPayload {
  userId: string;
  date: string;
  hours: number;
  reason: string;
}
