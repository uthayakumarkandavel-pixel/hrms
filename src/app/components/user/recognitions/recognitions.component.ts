import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CONSTANTS } from '../../../shared/constants/constant';
import { BadgesTabComponent } from './badges-tab/badges-tab.component';
import { YourBadgesTabComponent } from './your-badges-tab/your-badges-tab.component';
@Component({
  selector: 'app-recognitions',
  standalone: true,
  imports: [MatTabsModule, BadgesTabComponent, YourBadgesTabComponent],
  templateUrl: './recognitions.component.html',
  styleUrls: ['./recognitions.component.scss'],
})
export class RecognitionsComponent {
  RECOGNITIONS = CONSTANTS.RECOGNITIONS;
}
