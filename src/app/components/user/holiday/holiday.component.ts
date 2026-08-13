import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCard } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { CONSTANTS } from '../../../shared/constants/constant';
import { HolidayService } from '../../../services/holiday/holiday.service';

@Component({
  selector: 'hrms-holiday',
  imports: [MatCard, MatChip, DatePipe, UpperCasePipe],
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
