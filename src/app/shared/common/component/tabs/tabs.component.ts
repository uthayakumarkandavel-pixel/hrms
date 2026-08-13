import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface CommonTab {
  label: string;
  icon?: string;
  badge?: number;
}

@Component({
  selector: 'hrms-tabs',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input() tabs: CommonTab[] = [];
  @Input() activeIndex = 0;
  @Output() activeIndexChange = new EventEmitter<number>();

  select(index: number): void {
    this.activeIndex = index;
    this.activeIndexChange.emit(index);
  }
}
