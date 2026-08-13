import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { LeaveLimit, LeaveRequest, LeaveRequestPayload } from '../../shared/types/leave.types';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  private readonly http = inject(HttpClient);
  private readonly requestsSubject = new BehaviorSubject<LeaveRequest[]>([]);
  readonly leaveRequests$ = this.requestsSubject.asObservable();

  private loaded = false;

  getLeaveLimits(): Observable<LeaveLimit> {
    return this.http.get<LeaveLimit>('assets/mock-data/leave/leave-limits.json');
  }

  getLeaveRequests(userId: string): Observable<LeaveRequest[]> {
    this.ensureLoaded();

    return this.leaveRequests$.pipe(
      map(requests => requests.filter(request => request.userId === userId)),
    );
  }

  createLeaveRequest(payload: LeaveRequestPayload): Observable<LeaveRequest> {
    const request: LeaveRequest = {
      id: `LR-${Date.now()}`,
      ...payload,
      status: 'Pending',
    };

    this.requestsSubject.next([request, ...this.requestsSubject.value]);

    return of(request);
  }

  private ensureLoaded(): void {
    if (this.loaded) return;

    this.loaded = true;

    this.http
      .get<LeaveRequest[]>('assets/mock-data/leave/leave-requests.json')
      .subscribe({
        next: requests => this.requestsSubject.next(requests),
        error: () => this.requestsSubject.next([]),
      });
  }
}
