export type PermissionRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface PermissionRequest {
  rejectionReason?: string;
  id: string;
  userId: string;
  date: string;
  hours: number;
  reason: string;
  status: PermissionRequestStatus;
}

export interface PermissionUserData {
  requests: PermissionRequest[];
}

export interface PermissionData {
  limits: PermissionLimit;
  users: Record<string, PermissionUserData>;
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
