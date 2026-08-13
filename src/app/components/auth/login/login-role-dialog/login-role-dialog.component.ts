import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export type LoginRole = 'admin' | 'user';

@Component({
  selector: 'hrms-login-role-dialog',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './login-role-dialog.component.html',
  styleUrl: './login-role-dialog.component.scss',
})
export class LoginRoleDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<LoginRoleDialogComponent>);

  selectAdmin(): void {
    this.dialogRef.close('admin' as LoginRole);
  }

  selectUser(): void {
    this.dialogRef.close('user' as LoginRole);
  }

  close(): void {
    this.dialogRef.close();
  }
}
