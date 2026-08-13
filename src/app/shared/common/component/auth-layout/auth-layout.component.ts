import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CONSTANTS } from '../../../constants/constant';

@Component({
  selector: 'hrms-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  app = CONSTANTS.APP;
}
