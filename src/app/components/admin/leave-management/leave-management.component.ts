import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../services/auth.service';
import { LeaveService } from '../../../services/leave/leave.service';
import { PermissionService } from '../../../services/permission/permission.service';
import { UserService } from '../../../services/user/user.service';
import { DemoUser } from '../../../shared/types/user.types';
import { LeaveRequest } from '../../../shared/types/leave.types';
import { PermissionRequest } from '../../../shared/types/permission.types';
import { CommonTab, TabsComponent } from '../../../shared/common/component/tabs/tabs.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { PermissionRequestsComponent } from './permission-requests/permission-requests.component';

@Component({
  selector: 'hrms-leave-management',
  standalone: true,
  imports: [
    TabsComponent,
    LeaveRequestsComponent,
    PermissionRequestsComponent,
  ],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementComponent {
  private readonly auth = inject(AuthService);
  private readonly leave = inject(LeaveService);
  private readonly permission = inject(PermissionService);
  private readonly users = inject(UserService);

  readonly managedUsers = toSignal(
    this.users.getManagedUsers(this.auth.currentUser?.id ?? ''),
    { initialValue: [] as DemoUser[] },
  );

  readonly leaveRequests = toSignal(
    this.leave.getLeaveRequests(),
    { initialValue: [] as LeaveRequest[] },
  );

  readonly permissionRequests = toSignal(
    this.permission.getPermissionRequests(),
    { initialValue: [] as PermissionRequest[] },
  );

  private readonly leaveStatusOverrides = signal<Record<string, LeaveRequest['status']>>({});
  private readonly permissionStatusOverrides = signal<Record<string, PermissionRequest['status']>>({});

  activeTab = 0;

  readonly tabs: CommonTab[] = [
    { label: 'Leave Requests', icon: 'event_available' },
    { label: 'Permission Requests', icon: 'schedule' },
  ];

  get teamLeaves() {
    const managedIds = new Set(this.managedUsers().map(u => u.id));
    const overrides = this.leaveStatusOverrides();

    return this.leaveRequests()
      .filter(r => managedIds.has(r.userId))
      .map(r => ({
        ...r,
        status: overrides[r.id] ?? r.status,
        userName: this.userName(r.userId),
      }));
  }

  get teamPermissions() {
    const managedIds = new Set(this.managedUsers().map(u => u.id));
    const overrides = this.permissionStatusOverrides();

    return this.permissionRequests()
      .filter(r => managedIds.has(r.userId))
      .map(r => ({
        ...r,
        status: overrides[r.id] ?? r.status,
        userName: this.userName(r.userId),
      }));
  }

  private userName(id: string): string {
    return this.managedUsers().find(u => u.id === id)?.name ?? id;
  }

  onLeaveStatusChange(event: { id: string; status: LeaveRequest['status'] }): void {
    this.leaveStatusOverrides.update(current => ({
      ...current,
      [event.id]: event.status,
    }));
  }

  onPermissionStatusChange(event: {
    id: string;
    status: PermissionRequest['status'];
  }): void {
    this.permissionStatusOverrides.update(current => ({
      ...current,
      [event.id]: event.status,
    }));
  }
}
