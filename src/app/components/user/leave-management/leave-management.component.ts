import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LeaveRequest, PermissionRequest } from '../../../shared/types/leave-management';
import { RequestTypeDialogComponent } from './request-type-dialog/request-type-dialog.component';
import { LeaveRequestDialogComponent } from './leave-request-dialog/leave-request-dialog.component';
import { PermissionRequestDialogComponent } from './permission-request-dialog/permission-request-dialog.component';
import { CONSTANTS } from '../../../shared/constants/constant';
import { ProgressCardComponent } from '../../../shared/common/component/progress-card/progress-card.component';

@Component({
  selector: 'app-leave-management',
  standalone: true,

  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    ProgressCardComponent,
  ],

  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementUserComponent {
  private readonly dialog = inject(MatDialog);
  LEAVE_MANAGEMENT = CONSTANTS.LEAVE_MANAGEMENT;
  readonly limits = this.LEAVE_MANAGEMENT.LEAVE_LIMITS;

  usedLeaveDays = 5;

  usedPermissionHours = 0.5;

  leaveRequests: LeaveRequest[] = [
    {
      type: 'Sick Leave',
      from: new Date(2026, 2, 10),
      to: new Date(2026, 2, 11),
      days: 2,
      reason: 'Fever and rest',
      status: 'Approved',
    },

    {
      type: 'Casual Leave',
      from: new Date(2026, 4, 18),
      to: new Date(2026, 4, 19),
      days: 2,
      reason: 'Personal work',
      status: 'Pending',
    },
  ];

  permissionRequests: PermissionRequest[] = [
    {
      date: new Date(2026, 7, 5),
      hours: 1.5,
      reason: 'Personal appointment',
      status: 'Approved',
    },
  ];

  get remainingPermissionHours(): number {
    return Math.max(
      this.limits.monthlyPermissionHours - this.usedPermissionHours,
      0,
    );
  }

  openRequestDialog(): void {
    const dialogRef = this.dialog.open(RequestTypeDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((type) => {
      if (type === 'leave') this.openLeaveDialog();

      if (type === 'permission') this.openPermissionDialog();
    });
  }

  openLeaveDialog(): void {
    const dialogRef = this.dialog.open(LeaveRequestDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,

      data: {
        remainingDays: this.limits.annualLeaveDays-this.usedLeaveDays,
      },
    });

    dialogRef.afterClosed().subscribe((request) => {
      if (!request) {
        return;
      }

      this.leaveRequests.unshift({
        ...request,
        status: 'Pending',
      });

      this.usedLeaveDays += request.days;
    });
  }

  openPermissionDialog(): void {
    const dialogRef = this.dialog.open(PermissionRequestDialogComponent, {
      width: '480px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,

      data: {
        remainingHours: this.limits.monthlyPermissionHours-this.usedPermissionHours,
      },
    });

    dialogRef.afterClosed().subscribe((request) => {
      if (!request) {
        return;
      }

      this.permissionRequests.unshift({
        ...request,
        status: 'Pending',
      });

      this.usedPermissionHours += request.hours;
    });
  }
}
