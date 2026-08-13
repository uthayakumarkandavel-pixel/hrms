import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { LeaveLimit, LeaveRequest, LeaveRequestPayload } from '../../shared/types/leave.types';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private readonly http = inject(HttpClient);
  private readonly requestsSubject = new BehaviorSubject<LeaveRequest[]>([]);

  readonly leaveRequests$ = this.requestsSubject.asObservable();

  private readonly loadedRequests$ = this.http
    .get<LeaveRequest[]>('assets/mock-data/leave/leave-requests.json')
    .pipe(
      tap(requests => this.requestsSubject.next(requests)),
      shareReplay(1),
    );

  getLeaveLimits(): Observable<LeaveLimit> {
    return this.http.get<LeaveLimit>('assets/mock-data/leave/leave-limits.json');
  }

  getLeaveRequests(userId?: string): Observable<LeaveRequest[]> {
    return this.loadedRequests$.pipe(
      switchMap(() =>
        this.leaveRequests$.pipe(
          map(requests =>
            userId
              ? requests.filter(request => request.userId === userId)
              : requests,
          ),
        ),
      ),
    );
  }

  createLeaveRequest(payload: LeaveRequestPayload): Observable<LeaveRequest> {
    return this.loadedRequests$.pipe(
      map(() => {
        const request: LeaveRequest = {
          id: `LR-${Date.now()}`,
          ...payload,
          status: 'Pending',
        };

        this.requestsSubject.next([request, ...this.requestsSubject.value]);
        return request;
      }),
    );
  }

  updateLeaveRequestStatus(
    requestId: string,
    status: 'Approved' | 'Rejected',
  ): Observable<LeaveRequest | undefined> {
    return this.loadedRequests$.pipe(
      map(() => {
        const request = this.requestsSubject.value.find(item => item.id === requestId);

        if (!request) {
          return undefined;
        }

        const updatedRequest: LeaveRequest = {
          ...request,
          status,
        };

        this.requestsSubject.next(
          this.requestsSubject.value.map(item =>
            item.id === requestId ? updatedRequest : item,
          ),
        );

        return updatedRequest;
      }),
    );
  }

  getApprovedLeaveDays(userId: string): Observable<number> {
    return this.getLeaveRequests(userId).pipe(
      map(requests =>
        requests
          .filter(request => request.status === 'Approved')
          .reduce((total, request) => total + request.days, 0),
      ),
    );
  }
}
