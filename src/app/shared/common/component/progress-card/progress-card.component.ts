import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-progress-card',
  imports: [MatCard, MatIcon],
  templateUrl: './progress-card.component.html',
  styleUrl: './progress-card.component.scss',
})
export class ProgressCardComponent {
  @Input() title: Record<string, string> = {};
  @Input() progressbar: Record<string, number> = {};
  @Input() theme: string = '';
  @Input() icon:string=''

  get percentageCalculator(): number {
    return Math.min(
      (this.progressbar['remainingValue'] / this.progressbar['totalValue']) * 100,
      100,
    );
  }
}
