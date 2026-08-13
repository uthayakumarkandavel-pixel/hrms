import { Component, inject, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CONSTANTS } from '../../../constants/constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  items: ReadonlyArray<{ title: string; icon: string; link: string }> = [];
  SIDEBAR = CONSTANTS.SIDEBAR;
  private readonly router = inject(Router);

  ngOnInit(): void {
    const { SIDEBAR } = CONSTANTS;
    this.items = this.router.url.includes('/team-leader') ? SIDEBAR.ADMIN : SIDEBAR.USER;
  }
}
