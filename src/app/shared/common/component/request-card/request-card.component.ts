import { Component, Input } from '@angular/core';
import { DetailListComponent, DetailListItem } from '../detail-list/detail-list.component';
import { StatusBadgeComponent, StatusBadgeValue } from '../status-badge/status-badge.component';

@Component({
  selector: 'hrms-request-card',
  standalone: true,
  imports: [DetailListComponent, StatusBadgeComponent],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss',
})
export class RequestCardComponent {
  @Input({ required: true }) userName = '';
  @Input() subtitle = '';
  @Input({ required: true }) status: StatusBadgeValue = '';
  @Input() details: DetailListItem[] = [];
}
