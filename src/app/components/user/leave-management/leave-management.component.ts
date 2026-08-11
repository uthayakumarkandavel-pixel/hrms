import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LeaveRequest, PermissionRequest, RequestStatus } from '../../../shared/types/leave-management';
import { CONSTANTS } from '../../../shared/constants/constant';
import { RequestTypeDialogComponent } from './request-type-dialog/request-type-dialog.component';
import { LeaveRequestDialogComponent } from './leave-request-dialog/leave-request-dialog.component';
import { PermissionRequestDialogComponent } from './permission-request-dialog/permission-request-dialog.component';
import { ProgressCardComponent } from '../../../shared/common/component/progress-card/progress-card.component';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ProgressCardComponent],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementUserComponent {
  private readonly dialog = inject(MatDialog);

  readonly leaveManagement = CONSTANTS.LEAVE_MANAGEMENT;

  readonly limits = this.leaveManagement.LEAVE_LIMITS;

  readonly leaveRequests = signal<LeaveRequest[]>([
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
  ]);

  readonly permissionRequests = signal<PermissionRequest[]>([
    {
      date: new Date(2026, 7, 5),
      hours: 1.5,
      reason: 'Personal appointment',
      status: 'Approved',
    },
  ]);

  readonly usedLeaveDays = computed(() =>
    this.leaveRequests().reduce((total, request) => total + request.days, 0),
  );

  readonly usedPermissionHours = computed(() =>
    this.permissionRequests().reduce((total, request) => total + request.hours, 0),
  );

  readonly remainingLeaveDays = computed(() =>
    Math.max(this.limits.annualLeaveDays - this.usedLeaveDays(), 0),
  );

  readonly remainingPermissionHours = computed(() =>
    Math.max(this.limits.monthlyPermissionHours - this.usedPermissionHours(), 0),
  );

  openRequestDialog(): void {
    const dialogRef = this.dialog.open(RequestTypeDialogComponent, {
      width: '420px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((type) => {
      if (type === 'leave') {
        this.openLeaveDialog();
      }

      if (type === 'permission') {
        this.openPermissionDialog();
      }
    });
  }

  openLeaveDialog(): void {
    const dialogRef = this.dialog.open(LeaveRequestDialogComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
      data: {
        remainingDays: this.remainingLeaveDays(),
      },
    });

    dialogRef.afterClosed().subscribe((request) => {
      if (!request) {
        return;
      }

      this.appendRequest(this.leaveRequests, request);
    });
  }

  openPermissionDialog(): void {
    const dialogRef = this.dialog.open(PermissionRequestDialogComponent, {
      width: '500px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
      data: {
        remainingHours: this.remainingPermissionHours(),
      },
    });

    dialogRef.afterClosed().subscribe((request) => {
      if (!request) {
        return;
      }

      this.appendRequest(this.permissionRequests, request);
    });
  }

  private appendRequest<T extends { status: RequestStatus }>(
    store: WritableSignal<T[]>,
    request: T,
  ): void {
    store.update((requests) => [{ ...request, status: 'Pending' }, ...requests]);
  }
}
