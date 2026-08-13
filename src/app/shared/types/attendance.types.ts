export type AttendanceStatus = 'Present' | 'Absent' | 'Holiday' | 'Leave';
export interface AttendanceRecord {
  date: string;
  status: AttendanceStatus;
  checkIn: string | null;
  checkOut: string | null;
}
