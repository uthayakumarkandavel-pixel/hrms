import { Component } from '@angular/core';
import { CONSTANTS } from '../../../constants/constant';

@Component({
  selector: 'hrms-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  app = CONSTANTS.APP;
  text = CONSTANTS.FOOTER;
}
