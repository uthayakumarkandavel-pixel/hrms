import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CONSTANTS } from '../../../../shared/constants/constant';

type Badge = (typeof CONSTANTS.BADGES.CATALOG)[number];
type BadgeHistory = (typeof CONSTANTS.BADGES.HISTORY)[number];

@Component({
  selector: 'app-your-badges-tab',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './your-badges-tab.component.html',
  styleUrls: ['./your-badges-tab.component.scss'],
})
export class YourBadgesTabComponent {
  BADGES = CONSTANTS.BADGES;
  badges: readonly Badge[] = CONSTANTS.BADGES.CATALOG;
  history: readonly BadgeHistory[] = CONSTANTS.BADGES.HISTORY;

  get earnedCount(): number {
    return this.badges.filter((badge) => badge.status === 'Earned').length;
  }
}
