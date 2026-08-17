import {
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { AttendanceSession, HomeService } from '../../../services/home/home.service';
import { ButtonComponent } from '../../../shared/common/component/button/button.component';

type CelebrationType = 'birthday' | 'anniversary';

interface CelebrationPerson {
  name: string;
  initials: string;
  type: CelebrationType;
  month: number;
  day: number;
  years?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeUserComponent implements OnInit, OnDestroy {
  currentTime = signal(new Date());
  sessions = signal<AttendanceSession[]>([]);
  totalWorkingHours = signal('00h 00m');
  isLoggedIn = signal(false);
  showCelebration = signal(true);

  // Replace these demo records with the employee profile/HR calendar data when available.
  private readonly celebrations: CelebrationPerson[] = [
    { name: 'Priya Sharma', initials: 'PS', type: 'birthday', month: 8, day: 17 },
    { name: 'Rahul Kumar', initials: 'RK', type: 'anniversary', month: 8, day: 17, years: 3 },
  ];

  private clockTimer?: ReturnType<typeof setInterval>;
  private subscription?: Subscription;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.subscription = this.homeService.sessions$.subscribe((sessions) => {
      this.sessions.set(sessions);
      this.updateStatus();
      this.calculateWorkingHours();
    });

    this.clockTimer = setInterval(() => {
      this.currentTime.set(new Date());
      this.calculateWorkingHours();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    if (this.clockTimer) clearInterval(this.clockTimer);
  }

  login(): void {
    this.homeService.login();
  }

  logout(): void {
    this.homeService.logout();
  }

  dismissCelebration(): void {
    this.showCelebration.set(false);
  }

  todayCelebrations(): CelebrationPerson[] {
    const date = this.currentTime();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return this.celebrations.filter((person) => person.month === month && person.day === day);
  }

  todayBirthdays(): CelebrationPerson[] {
    return this.todayCelebrations().filter((person) => person.type === 'birthday');
  }

  todayAnniversaries(): CelebrationPerson[] {
    return this.todayCelebrations().filter((person) => person.type === 'anniversary');
  }

  private updateStatus(): void {
    this.isLoggedIn.set(this.sessions().some((session) => !session.logoutTime));
  }

  private calculateWorkingHours(): void {
    const sessions = this.sessions();
    let totalMilliseconds = 0;

    for (const session of sessions) {
      const loginTime = session.loginTime.getTime();
      const logoutTime = session.logoutTime ? session.logoutTime.getTime() : Date.now();
      totalMilliseconds += Math.max(0, logoutTime - loginTime);
    }

    const totalMinutes = Math.floor(totalMilliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    this.totalWorkingHours.set(`${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`);
  }
}
