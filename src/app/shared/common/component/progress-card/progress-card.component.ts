import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

interface ProgressCardTitle {
  TITLE: string;
  CAPTION: string;
}

interface ProgressCardData {
  usedValue: number;
  totalValue: number;
}

@Component({
  selector: 'app-progress-card',
  imports: [MatCard, MatIcon],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.scss',
})
export class ProgressCardComponent {
  @Input() title: ProgressCardTitle = { TITLE: '', CAPTION: '' };
  @Input() progressbar: ProgressCardData = { usedValue: 0, totalValue: 1 };
  @Input() theme = '';
  @Input() icon = '';

  get percentageCalculator(): number {
    if (this.progressbar.totalValue <= 0) {
      return 0;
    }

    return Math.min((this.progressbar.usedValue / this.progressbar.totalValue) * 100, 100);
  }
}
