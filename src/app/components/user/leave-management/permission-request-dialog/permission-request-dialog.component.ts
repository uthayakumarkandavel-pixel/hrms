import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';

import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';

import { MatSelectModule } from '@angular/material/select';
import { PermissionRequestResult } from '../../../../shared/types/leave-management';

export interface PermissionDialogData {
  remainingHours: number;
}

@Component({
  selector: 'app-permission-request-dialog',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
  ],

  templateUrl: './permission-request-dialog.component.html',

  styleUrl: './permission-request-dialog.component.scss',
})
export class PermissionRequestDialogComponent {
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef = inject(MatDialogRef<PermissionRequestDialogComponent>);

  readonly data = inject<PermissionDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    date: this.fb.control<Date | null>(null, Validators.required),

    hours: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0.5),
      Validators.max(3),
    ]),

    reason: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const { date, hours, reason } = this.form.getRawValue();

    if (!date || hours === null) {
      return;
    }

    if (hours > this.data.remainingHours) {
      this.form.controls.hours.setErrors({
        exceedsBalance: true,
      });

      return;
    }

    const result: PermissionRequestResult = {
      date,
      hours,
      reason,
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
