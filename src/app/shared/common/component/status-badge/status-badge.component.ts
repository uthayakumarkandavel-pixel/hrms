import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

export type StatusBadgeValue = 'Pending' | 'Approved' | 'Rejected' | string;

@Component({
  selector: 'hrms-status-badge',
  standalone: true,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss',
  imports: [MatIcon],
})
export class StatusBadgeComponent {
  @Input({ required: true }) status: StatusBadgeValue = '';
  @Input() rejectReason:string='';
}
