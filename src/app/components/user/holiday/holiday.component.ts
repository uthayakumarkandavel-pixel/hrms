import { DatePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';

import { CONSTANTS } from '../../../shared/constants/constant';

@Component({
  selector: 'app-holiday',
  imports: [MatCard, MatChip,  DatePipe, UpperCasePipe],
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.scss',
})
export class HolidayComponent {
  holidays = CONSTANTS.HOLIDAYS[2026];
}
