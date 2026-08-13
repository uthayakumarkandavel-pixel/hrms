import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AttendanceService } from '../../../services/attendance/attendance.service';

@Component({
  selector: 'hrms-attendence',
  imports: [],
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.scss',
})
export class AttendenceComponent {
  private readonly service = inject(AttendanceService);

  readonly attendance = toSignal(this.service.getAttendance(), {
    initialValue: [],
  });
}
