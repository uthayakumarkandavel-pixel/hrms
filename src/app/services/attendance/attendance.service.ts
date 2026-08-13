import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceRecord } from '../../shared/types/attendance.types';

@Injectable({ providedIn: 'root' })
export class AttendanceService {
  private readonly http = inject(HttpClient);
  getAttendance(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>('assets/mock-data/attendance/attendance.json');
  }
}
