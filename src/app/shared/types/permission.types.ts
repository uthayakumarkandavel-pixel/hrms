export type PermissionRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface PermissionRequest {
  id: string;
  userId: string;
  date: string;
  hours: number;
  reason: string;
  status: PermissionRequestStatus;
}

export interface PermissionRequestPayload {
  userId: string;
  date: string;
  hours: number;
  reason: string;
}

export interface PermissionLimit {
  monthlyPermissionHours: number;
}
