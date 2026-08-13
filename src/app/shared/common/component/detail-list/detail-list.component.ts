import { Component, Input } from '@angular/core';

export interface DetailListItem {
  label: string;
  value: string | number;
}

@Component({
  selector: 'hrms-detail-list',
  standalone: true,
  templateUrl: './detail-list.component.html',
  styleUrl: './detail-list.component.scss',
})
export class DetailListComponent {
  @Input() items: DetailListItem[] = [];
}
