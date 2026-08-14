import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { Badge, BadgeHistory, RecognitionData } from '../../shared/types/recognition.types';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class RecognitionService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly data$ = this.http
    .get<RecognitionData>('assets/mock-data/recognition.json')
    .pipe(shareReplay(1));

  private get userId(): string {
    return this.auth.currentUser?.id ?? 'user-001';
  }

  getBadges(userId = this.userId): Observable<Badge[]> {
    return this.data$.pipe(map(data => data.users[userId]?.badges ?? []));
  }

  getBadgeHistory(userId = this.userId): Observable<BadgeHistory[]> {
    return this.data$.pipe(map(data => data.users[userId]?.history ?? []));
  }
}
