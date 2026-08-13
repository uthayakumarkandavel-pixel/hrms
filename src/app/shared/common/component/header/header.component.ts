import { Component, EventEmitter, inject, Output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { CONSTANTS } from '../../../constants/constant';

@Component({
  selector: 'hrms-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() readonly toggleSidebar = new EventEmitter<void>();
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  app = CONSTANTS.APP;
  text = CONSTANTS.HEADER;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
