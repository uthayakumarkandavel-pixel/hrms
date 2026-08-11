import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
export type RequestType = 'leave' | 'permission';

@Component({
  selector: 'app-request-type-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './request-type-dialog.component.html',
  styleUrl: './request-type-dialog.component.scss',
})
export class RequestTypeDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<RequestTypeDialogComponent>);

  select(type: RequestType): void {
    this.dialogRef.close(type);
  }

  close(): void {
    this.dialogRef.close();
  }
}
