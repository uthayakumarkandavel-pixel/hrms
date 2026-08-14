import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CONSTANTS } from '../../../shared/constants/constant';
import { HolidayService } from '../../../services/holiday/holiday.service';

@Component({
  selector: 'hrms-holiday',
  imports: [DatePipe, UpperCasePipe],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.scss',
})
export class HolidayComponent {
  readonly text = CONSTANTS.HOLIDAY;
  private readonly holidayService = inject(HolidayService);

  readonly holidays = toSignal(this.holidayService.getHolidays(2026), {
    initialValue: [],
  });
}
