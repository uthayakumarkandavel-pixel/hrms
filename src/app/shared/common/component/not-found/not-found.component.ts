import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { CONSTANTS } from '../../../constants/constant';

@Component({
  selector: 'hrms-not-found',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink, MatCard],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  text = CONSTANTS.NOT_FOUND;
}
