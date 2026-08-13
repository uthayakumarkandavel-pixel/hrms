import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay } from 'rxjs';
import { PermissionLimit, PermissionRequest, PermissionRequestPayload } from '../../shared/types/permission.types';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly http = inject(HttpClient);
  private readonly requestsSubject = new BehaviorSubject<PermissionRequest[]>([]);

  private readonly loadedRequests$ = this.http
    .get<PermissionRequest[]>('assets/mock-data/permission/permission-requests.json')
    .pipe(
      map(requests => { this.requestsSubject.next(requests); return requests; }),
      shareReplay(1),
    );

  getPermissionLimits(): Observable<PermissionLimit> {
    return this.http.get<PermissionLimit>('assets/mock-data/permission/permission-limits.json');
  }

  getPermissionRequests(userId?: string): Observable<PermissionRequest[]> {
    return this.loadedRequests$.pipe(
      map(() => {
        const requests = this.requestsSubject.value;
        return userId ? requests.filter(r => r.userId === userId) : requests;
      }),
    );
  }

  createPermissionRequest(payload: PermissionRequestPayload): Observable<PermissionRequest> {
    return this.loadedRequests$.pipe(
      map(() => {
        const request: PermissionRequest = { id: `PR-${Date.now()}`, ...payload, status: 'Pending' };
        this.requestsSubject.next([request, ...this.requestsSubject.value]);
        return request;
      }),
    );
  }

  updatePermissionRequestStatus(
    requestId: string,
    status: 'Approved' | 'Rejected',
  ): Observable<PermissionRequest | undefined> {
    return this.loadedRequests$.pipe(
      map(() => {
        const request = this.requestsSubject.value.find(r => r.id === requestId);
        if (!request) return undefined;
        const updated = { ...request, status };
        this.requestsSubject.next(this.requestsSubject.value.map(r => r.id === requestId ? updated : r));
        return updated;
      }),
    );
  }
}
