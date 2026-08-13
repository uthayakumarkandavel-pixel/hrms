import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Holiday } from '../../shared/types/holiday.types';

@Injectable({ providedIn: 'root' })
export class HolidayService {
  private readonly http = inject(HttpClient);
  getHolidays(year = new Date().getFullYear()): Observable<Holiday[]> {
    return this.http.get<Holiday[]>('assets/mock-data/holiday/holidays.json').pipe(
      map(holidays => holidays.filter(h => h.date.startsWith(`${year}-`)))
    );
  }
}
