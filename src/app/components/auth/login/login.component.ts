import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginAsUser(): void {
    this.authService.login({ id: 'user', role: 'user' });
    this.router.navigate(['/team-member/home']);
  }

  loginAsAdmin(): void {
    this.authService.login({ id: 'admin', role: 'admin' });
    this.router.navigate(['/team-leader/home']);
  }
}
