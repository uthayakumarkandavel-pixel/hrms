export type LeaveType = 'Sick Leave' | 'Casual Leave';
export type RequestStatus = 'Pending' | 'Approved' | 'Rejected';
export interface LeaveLimit {
  annualLeaveDays: number;
  monthlyPermissionHours: number;
  casualLeaveAdvanceMonths: number;
}
export interface LeaveRequest {
  id: string;
  userId: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: RequestStatus;
  rejectionReason?: string;
}
export interface LeaveRequestPayload {
  userId: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  reason: string;
}
