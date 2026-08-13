import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CONSTANTS } from '../../../../shared/constants/constant';
import { RecognitionService } from '../../../../services/recognition/recognition.service';

@Component({
  selector: 'app-your-badges-tab',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './your-badges-tab.component.html',
  styleUrls: ['./your-badges-tab.component.scss'],
})
export class YourBadgesTabComponent {
  readonly BADGES = CONSTANTS.BADGES;

  private readonly service = inject(RecognitionService);

  readonly badges = toSignal(this.service.getBadges(), {
    initialValue: [],
  });

  readonly history = toSignal(this.service.getBadgeHistory(), {
    initialValue: [],
  });

  readonly earnedCount = computed(
    () => this.badges().filter((badge) => badge.status === 'Earned').length,
  );
}
