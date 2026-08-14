import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, switchMap, tap } from 'rxjs';
import { PermissionData, PermissionLimit, PermissionRequest, PermissionRequestPayload } from '../../shared/types/permission.types';


@Injectable({ providedIn: 'root' })
export class PermissionService {
  private readonly http = inject(HttpClient);
  private readonly data$ = this.http
    .get<PermissionData>('assets/mock-data/permission.json')
    .pipe(shareReplay(1));
  private readonly requestsSubject = new BehaviorSubject<Record<string, PermissionRequest[]>>({});
  private loaded = false;

  readonly permissionRequests$ = this.requestsSubject.asObservable();

  getPermissionLimits(): Observable<PermissionLimit> {
    return this.data$.pipe(map(data => data.limits));
  }

  getPermissionRequests(userId?: string): Observable<PermissionRequest[]> {
    return this.ensureLoaded().pipe(
      switchMap(() =>
        this.permissionRequests$.pipe(
          map(requests => userId ? requests[userId] ?? [] : Object.values(requests).flat()),
        ),
      ),
    );
  }

  createPermissionRequest(payload: PermissionRequestPayload): Observable<PermissionRequest> {
    return this.ensureLoaded().pipe(
      map(() => {
        const request: PermissionRequest = {
          id: `PR-${Date.now()}`,
          ...payload,
          status: 'Pending',
        };
        const current = this.requestsSubject.value[payload.userId] ?? [];

        this.requestsSubject.next({
          ...this.requestsSubject.value,
          [payload.userId]: [request, ...current],
        });

        return request;
      }),
    );
  }

  updatePermissionRequestStatus(
    requestId: string,
    status: 'Approved' | 'Rejected',
  ): Observable<PermissionRequest | undefined> {
    return this.ensureLoaded().pipe(
      map(() => {
        const requestsByUser = this.requestsSubject.value;
        const userId = Object.keys(requestsByUser).find(id =>
          requestsByUser[id].some(request => request.id === requestId),
        );

        if (!userId) {
          return undefined;
        }

        let updatedRequest: PermissionRequest | undefined;
        const updatedRequests = requestsByUser[userId].map(request => {
          if (request.id !== requestId) {
            return request;
          }

          updatedRequest = { ...request, status };
          return updatedRequest;
        });

        this.requestsSubject.next({
          ...requestsByUser,
          [userId]: updatedRequests,
        });

        return updatedRequest;
      }),
    );
  }

  private ensureLoaded(): Observable<PermissionData> {
    if (this.loaded) {
      return this.data$;
    }

    return this.data$.pipe(
      tap(data => {
        if (this.loaded) {
          return;
        }

        this.requestsSubject.next(
          Object.fromEntries(
            Object.entries(data.users).map(([userId, userData]) => [userId, userData.requests]),
          ),
        );
        this.loaded = true;
      }),
    );
  }
}
