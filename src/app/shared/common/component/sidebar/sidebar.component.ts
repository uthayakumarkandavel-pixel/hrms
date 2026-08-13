import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { CONSTANTS } from '../../../constants/constant';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'hrms-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  items: ReadonlyArray<{ title: string; icon: string; link: string }> = [];
  SIDEBAR = CONSTANTS.SIDEBAR;
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.items = this.authService.currentUser?.role === 'admin'
      ? CONSTANTS.SIDEBAR.ADMIN
      : CONSTANTS.SIDEBAR.USER;
  }
}
