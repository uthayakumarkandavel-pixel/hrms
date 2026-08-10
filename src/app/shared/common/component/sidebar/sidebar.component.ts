import { Component, DoCheck, inject, Input, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common';

import { MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SIDEBAR } from '../../../constants/constant';

@Component({
  selector: 'app-sidebar',
  standalone: true,

  imports: [ RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatDividerModule],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {

  items :{title:string,icon:string,link:string}[]= [];
  private readonly router=inject(Router)

  ngOnInit(): void {
    this.items=this.router.url.includes('/team-leader')?SIDEBAR.ADMIN:SIDEBAR.USER
    
  }
}
