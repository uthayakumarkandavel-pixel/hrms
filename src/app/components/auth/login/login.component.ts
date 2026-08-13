import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CONSTANTS } from '../../../shared/constants/constant';
import { LoginRoleDialogComponent, LoginRole } from './login-role-dialog/login-role-dialog.component';

@Component({
  selector: 'hrms-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  text = CONSTANTS.AUTH;
  hidePassword = true;
  loginError = '';

  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  submit(): void {
    this.loginError = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    this.authService.authenticate(email, password).subscribe({
      next: user => {
        if (user.role === 'admin') {
          this.openAdminLoginChoice(user);
          return;
        }

        this.completeLogin(user);
      },
      error: () => {
        this.loginError = 'Invalid email or password.';
      },
    });
  }

  private openAdminLoginChoice(adminUser: {
    id: string;
    name?: string;
    role: 'admin' | 'user';
  }): void {
    const dialogRef = this.dialog.open(LoginRoleDialogComponent, {
      width: '460px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((role: LoginRole | undefined) => {
      if (!role) return;

      if (role === 'admin') {
        this.completeLogin(adminUser);
        return;
      }

      // For this demo, choosing "Login as User" enters as User One.
      this.authService.authenticate('user1@hrms.demo', 'user123').subscribe(user => {
        this.completeLogin(user);
      });
    });
  }

  private completeLogin(user: {
    id: string;
    name?: string;
    role: 'admin' | 'user';
  }): void {
    this.authService.login(user);

    if (user.role === 'admin') {
      this.router.navigate(['/team-leader/home']);
    } else {
      this.router.navigate(['/team-member/home']);
    }
  }
}
