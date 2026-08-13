import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { PermissionRequest, PermissionRequestPayload } from '../../shared/types/permission.types';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly http = inject(HttpClient);
  private readonly requestsSubject = new BehaviorSubject<PermissionRequest[]>([]);
  readonly permissionRequests$ = this.requestsSubject.asObservable();
  private loaded = false;

  getPermissionRequests(userId: string): Observable<PermissionRequest[]> {
    this.ensureLoaded();
    return this.permissionRequests$.pipe(map(requests => requests.filter(r => r.userId === userId)));
  }

  createPermissionRequest(payload: PermissionRequestPayload): Observable<PermissionRequest> {
    const request: PermissionRequest = { id: `PR-${Date.now()}`, ...payload, status: 'Pending' };
    this.requestsSubject.next([request, ...this.requestsSubject.value]);
    return of(request);
  }

  private ensureLoaded(): void {
    if (this.loaded) return;
    this.loaded = true;
    this.http.get<PermissionRequest[]>('assets/mock-data/permission/permission-requests.json').subscribe({
      next: requests => this.requestsSubject.next(requests),
      error: () => this.requestsSubject.next([]),
    });
  }
}
