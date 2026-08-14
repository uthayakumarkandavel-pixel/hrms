import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map, shareReplay, throwError } from 'rxjs';
import { AuthUser, DemoLoginUser } from '../shared/types/auth.types';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly userSubject = new BehaviorSubject<AuthUser | null>(null);
  readonly user$ = this.userSubject.asObservable();

  private readonly demoUsers$ = this.http
    .get<DemoLoginUser[]>('assets/mock-data/auth/demo-users.json')
    .pipe(shareReplay(1));

  get currentUser(): AuthUser | null {
    return this.userSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  authenticate(email: string, password: string): Observable<AuthUser> {
    return this.demoUsers$.pipe(
      map(users => {
        const user = users.find(
          item =>
            item.email.toLowerCase() === email.trim().toLowerCase() &&
            item.password === password,
        );

        if (!user) {
          throw new Error('Invalid email or password.');
        }

        return {
          id: user.id,
          name: user.name,
          role: user.role,
        };
      }),
    );
  }

  login(user: AuthUser): void {
    this.userSubject.next(user);
  }

  logout(): void {
    this.userSubject.next(null);
  }
}
