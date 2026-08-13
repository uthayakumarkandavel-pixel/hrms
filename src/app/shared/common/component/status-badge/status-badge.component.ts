import { Component, Input } from '@angular/core';

export type StatusBadgeValue = 'Pending' | 'Approved' | 'Rejected' | string;

@Component({
  selector: 'hrms-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status: StatusBadgeValue = '';
}
