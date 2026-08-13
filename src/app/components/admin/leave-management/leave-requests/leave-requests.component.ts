import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LeaveService } from '../../../../services/leave/leave.service';
import { LeaveRequest } from '../../../../shared/types/leave.types';
import { ButtonComponent } from '../../../../shared/common/component/button/button.component';
import { RequestCardComponent } from '../../../../shared/common/component/request-card/request-card.component';

type LeaveViewRequest = LeaveRequest & { userName: string };
type LeaveDecisionStatus = Extract<LeaveRequest['status'], 'Approved' | 'Rejected'>;

@Component({
  selector: 'hrms-leave-requests',
  standalone: true,
  imports: [DatePipe, MatIconModule, ButtonComponent, RequestCardComponent],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.scss',
})
export class LeaveRequestsComponent {
  private readonly leave = inject(LeaveService);

  @Input({ required: true }) requests: LeaveViewRequest[] = [];

  @Output() readonly statusChange = new EventEmitter<{
    id: string;
    status: LeaveDecisionStatus;
  }>();

  busy = new Set<string>();

  approve(id: string): void {
    this.updateStatus(id, 'Approved');
  }

  reject(id: string): void {
    this.updateStatus(id, 'Rejected');
  }

  private updateStatus(id: string, status: LeaveDecisionStatus): void {
    if (this.busy.has(id)) {
      return;
    }

    this.busy.add(id);

    this.leave.updateLeaveRequestStatus(id, status).subscribe({
      next: () => {
        this.busy.delete(id);
        this.statusChange.emit({ id, status });
      },
      error: error => {
        this.busy.delete(id);
        console.error('Failed to update leave request status', error);
      },
    });
  }
}
