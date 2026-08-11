export type LeaveType = 'Sick Leave' | 'Casual Leave';

export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  type: LeaveType;
  from: Date;
  to: Date;
  days: number;
  reason: string;
  status: RequestStatus;
}

export interface PermissionRequest {
  date: Date;
  hours: number;
  reason: string;
  status: RequestStatus;
}

export interface LeaveRequestResult {
  type: LeaveType;
  from: Date;
  to: Date;
  days: number;
  reason: string;
}

export interface PermissionRequestResult {
  date: Date;
  hours: number;
  reason: string;
}
