import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Badge, BadgeHistory } from '../../shared/types/recognition.types';

@Injectable({ providedIn: 'root' })
export class RecognitionService {
  private readonly http = inject(HttpClient);
  getBadges(): Observable<Badge[]> {
    return this.http.get<Badge[]>('assets/mock-data/recognition/badges.json');
  }
  getBadgeHistory(): Observable<BadgeHistory[]> {
    return this.http.get<BadgeHistory[]>('assets/mock-data/recognition/badge-history.json');
  }
}
