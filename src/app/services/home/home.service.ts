import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AttendanceSession {
  id: string;
  loginTime: Date;
  logoutTime: Date | null;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private sessionsSubject = new BehaviorSubject<
    AttendanceSession[]
  >([]);

  sessions$ = this.sessionsSubject.asObservable();

  login(): void {
    const sessions = this.sessionsSubject.value;

    const activeSession = sessions.find(
      (session) => !session.logoutTime
    );

    if (activeSession) {
      return;
    }

    const session: AttendanceSession = {
      id: crypto.randomUUID(),
      loginTime: new Date(),
      logoutTime: null,
    };

    this.sessionsSubject.next([
      ...sessions,
      session,
    ]);
  }

  logout(): void {
    const sessions = this.sessionsSubject.value;

    const activeIndex = sessions.findIndex(
      (session) => !session.logoutTime
    );

    if (activeIndex === -1) {
      return;
    }

    const updatedSessions = [...sessions];

    updatedSessions[activeIndex] = {
      ...updatedSessions[activeIndex],
      logoutTime: new Date(),
    };

    this.sessionsSubject.next(updatedSessions);
  }
}