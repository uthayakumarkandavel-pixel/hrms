import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PermissionService } from '../../../../services/permission/permission.service';
import { PermissionRequest } from '../../../../shared/types/permission.types';
import { ButtonComponent } from '../../../../shared/common/component/button/button.component';
import { RequestCardComponent } from '../../../../shared/common/component/request-card/request-card.component';

type PermissionViewRequest = PermissionRequest & { userName: string };

@Component({
  selector: 'hrms-permission-requests',
  standalone: true,
  imports: [DatePipe, MatIconModule, ButtonComponent, RequestCardComponent],
  templateUrl: './permission-requests.component.html',
  styleUrl: './permission-requests.component.scss',
})
export class PermissionRequestsComponent {
  private readonly permission = inject(PermissionService);

  @Input({ required: true }) requests: PermissionViewRequest[] = [];

  @Output() readonly statusChange = new EventEmitter<{
    id: string;
    status: PermissionRequest['status'];
  }>();

  busy = new Set<string>();

  approve(id: string): void {
    this.updateStatus(id, 'Approved');
  }

  reject(id: string): void {
    this.updateStatus(id, 'Rejected');
  }

  private updateStatus(id: string, status: 'Approved' | 'Rejected'): void {
    if (this.busy.has(id)) {
      return;
    }

    this.busy.add(id);

    this.permission.updatePermissionRequestStatus(id, status).subscribe({
      next: () => {
        this.busy.delete(id);
        this.statusChange.emit({ id, status });
      },
      error: error => {
        this.busy.delete(id);
        console.error('Failed to update permission request status', error);
      },
    });
  }
}
