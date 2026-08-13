import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CONSTANTS } from '../../../constants/constant';

type PageHeader = (typeof CONSTANTS.PAGE_HEADERS)[keyof typeof CONSTANTS.PAGE_HEADERS];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, HeaderComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  sidebarOpen = true;
  pageHeader: PageHeader | null = null;

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.updatePageHeader();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageHeader());
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  private updatePageHeader(): void {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const headerKey = route.snapshot.data['pageHeader'] as keyof typeof CONSTANTS.PAGE_HEADERS | undefined;
    this.pageHeader = headerKey ? CONSTANTS.PAGE_HEADERS[headerKey] : null;
  }
}
