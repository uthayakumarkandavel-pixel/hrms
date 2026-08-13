import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CONSTANTS } from '../../../shared/constants/constant';
import { ProgressCardComponent } from '../../../shared/common/component/progress-card/progress-card.component';
import { LeaveService } from '../../../services/leave/leave.service';
import { PermissionService } from '../../../services/permission/permission.service';
import { LeaveRequestDialogComponent } from './leave-request-dialog/leave-request-dialog.component';
import { PermissionRequestDialogComponent } from './permission-request-dialog/permission-request-dialog.component';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ProgressCardComponent],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementUserComponent {
  private readonly dialog = inject(MatDialog);
  private readonly leaveService = inject(LeaveService);
  private readonly permissionService = inject(PermissionService);

  readonly leaveManagement = CONSTANTS.LEAVE_MANAGEMENT;
  readonly leave = CONSTANTS.LEAVE;

  readonly limits = toSignal(this.leaveService.getLeaveLimits(), {
    initialValue: {
      annualLeaveDays: 0,
      monthlyPermissionHours: 0,
      casualLeaveAdvanceMonths: 1,
    },
  });

  readonly leaveRequests = toSignal(this.leaveService.getLeaveRequests('user-001'), {
    initialValue: [],
  });

  readonly permissionRequests = toSignal(this.permissionService.getPermissionRequests('user-001'), {
    initialValue: [],
  });

  get usedLeaveDays(): number {
    return this.leaveRequests().reduce((total, request) => total + request.days, 0);
  }

  get usedPermissionHours(): number {
    return this.permissionRequests().reduce((total, request) => total + request.hours, 0);
  }

  get remainingLeaveDays(): number {
    return Math.max(this.limits().annualLeaveDays - this.usedLeaveDays, 0);
  }

  get remainingPermissionHours(): number {
    return Math.max(this.limits().monthlyPermissionHours - this.usedPermissionHours, 0);
  }

  openLeaveDialog(): void {
    const ref = this.dialog.open(LeaveRequestDialogComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
      data: {
        remainingDays: this.remainingLeaveDays,
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;

      this.leaveService
        .createLeaveRequest({
          userId: 'user-001',
          type: result.type,
          from: result.from.toISOString().slice(0, 10),
          to: result.to.toISOString().slice(0, 10),
          days: result.days,
          reason: result.reason,
        })
        .subscribe();
    });
  }

  openPermissionDialog(): void {
    const ref = this.dialog.open(PermissionRequestDialogComponent, {
      width: '500px',
      maxWidth: 'calc(100vw - 32px)',
      autoFocus: false,
      data: {
        remainingHours: this.remainingPermissionHours,
      },
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;

      this.permissionService
        .createPermissionRequest({
          userId: 'user-001',
          date: result.date.toISOString().slice(0, 10),
          hours: result.hours,
          reason: result.reason,
        })
        .subscribe();
    });
  }
}
