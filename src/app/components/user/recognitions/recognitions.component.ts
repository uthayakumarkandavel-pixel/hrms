import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { CONSTANTS } from '../../../shared/constants/constant';

interface AttendanceBadge {
  name: string;
  duration: string;
  description: string;
  icon: string;
  status: 'Earned' | 'In Progress' | 'Locked';
  progress: number | null;
  current: number;
  target: number;
}

interface BadgeHistory {
  name: string;
  description: string;
  date: string;
  icon: string;
}

@Component({
  selector: 'app-recognitions',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    MatTabsModule,
  ],
  templateUrl: './recognitions.component.html',
  styleUrls: ['./recognitions.component.scss'],
})
export class RecognitionsComponent {
  text = CONSTANTS.RECOGNITIONS;
  badges=CONSTANTS.BADGES.badges
  history=CONSTANTS.BADGES.history
}
