import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RecognitionService } from '../../../../services/recognition/recognition.service';

@Component({
  selector: 'hrms-badges-tab',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatIconModule, MatProgressBarModule],
  templateUrl: './badges-tab.component.html',
  styleUrls: ['./badges-tab.component.scss'],
})
export class BadgesTabComponent {
  private readonly service = inject(RecognitionService);

  readonly badges = toSignal(this.service.getBadges(), {
    initialValue: [],
  });
}
