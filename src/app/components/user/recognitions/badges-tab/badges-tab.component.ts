import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CONSTANTS } from '../../../../shared/constants/constant';

type Badge = (typeof CONSTANTS.BADGES.CATALOG)[number];

@Component({
  selector: 'app-badges-tab',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
  ],
  templateUrl: './badges-tab.component.html',
  styleUrls: ['./badges-tab.component.scss'],
})
export class BadgesTabComponent {
  badges: readonly Badge[] = CONSTANTS.BADGES.CATALOG;
}
