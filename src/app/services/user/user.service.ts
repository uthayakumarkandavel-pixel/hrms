import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { DemoUser } from '../../shared/types/user.types';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly users$ = this.http
    .get<DemoUser[]>('assets/mock-data/users/users.json')
    .pipe(shareReplay(1));

  getUsers(): Observable<DemoUser[]> {
    return this.users$;
  }

  getManagedUsers(adminId: string): Observable<DemoUser[]> {
    return this.users$.pipe(
      map(users => users.filter(user => user.role === 'user' && user.adminId === adminId)),
    );
  }

  getUserName(userId: string): Observable<string> {
    return this.users$.pipe(
      map(users => users.find(user => user.id === userId)?.name ?? userId),
    );
  }
}
