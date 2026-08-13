import { Component } from '@angular/core';
import { CONSTANTS } from '../../../shared/constants/constant';
import { TabsComponent, CommonTab } from '../../../shared/common/component/tabs/tabs.component';
import { BadgesTabComponent } from './badges-tab/badges-tab.component';
import { YourBadgesTabComponent } from './your-badges-tab/your-badges-tab.component';

@Component({
  selector: 'hrms-recognitions',
  standalone: true,
  imports: [TabsComponent, BadgesTabComponent, YourBadgesTabComponent],
  templateUrl: './recognitions.component.html',
  styleUrl: './recognitions.component.scss',
})
export class RecognitionsComponent {
  activeTab = 0;

  readonly tabs: CommonTab[] = [
    { label: CONSTANTS.RECOGNITIONS.BADGES, icon: 'military_tech' },
    { label: CONSTANTS.RECOGNITIONS.YOUR_BADGES, icon: 'workspace_premium' },
  ];
}
