import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
import { CONSTANTS } from '../../../../shared/constants/constant';

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
  text = CONSTANTS.PERMISSION_DIALOG;
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef = inject(MatDialogRef<PermissionRequestDialogComponent>);

  private readonly destroyRef = inject(DestroyRef);

  readonly data = inject<PermissionDialogData>(MAT_DIALOG_DATA);

  readonly today = this.startOfDay(new Date());

  private readonly allPermissionOptions = [0.5, 1, 1.5, 2, 2.5, 3];

  readonly form = this.fb.nonNullable.group({
    date: this.fb.control<Date | null>(null, Validators.required),

    hours: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(0.5),
      Validators.max(3),
    ]),

    reason: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
    ]),
  });

  constructor() {
    if (this.data.remainingHours <= 0) {
      this.form.disable();
    }
    this.form.controls.hours.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value !== null && value > this.data.remainingHours) {
        this.form.controls.hours.reset();
      }
    });
  }

  get hasPermissionBalance(): boolean {
    return this.data.remainingHours > 0;
  }

  get availablePermissionOptions(): number[] {
    return this.allPermissionOptions.filter((hours) => hours <= this.data.remainingHours);
  }

  submit(): void {
    this.clearCustomErrors();

    this.form.markAllAsTouched();

    if (this.form.disabled || this.form.invalid) {
      return;
    }

    const { date, hours, reason } = this.form.getRawValue();

    if (!date || hours === null) {
      return;
    }

    const selectedDate = this.startOfDay(date);

    if (selectedDate < this.today) {
      this.form.controls.date.setErrors({
        pastDate: true,
      });

      return;
    }

    if (hours > 3) {
      this.form.controls.hours.setErrors({
        exceedsMaximum: true,
      });

      return;
    }
    if (hours > this.data.remainingHours) {
      this.form.controls.hours.setErrors({
        exceedsBalance: true,
      });

      return;
    }

    const result: PermissionRequestResult = {
      date: selectedDate,

      hours,

      reason: reason.trim(),
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private clearCustomErrors(): void {
    this.removeError(this.form.controls.date, 'pastDate');

    this.removeError(this.form.controls.hours, 'exceedsMaximum');

    this.removeError(this.form.controls.hours, 'exceedsBalance');
  }

  private removeError(control: any, key: string): void {
    const errors = control.errors;

    if (!errors?.[key]) {
      return;
    }

    const remaining = {
      ...errors,
    };

    delete remaining[key];

    control.setErrors(Object.keys(remaining).length ? remaining : null);
  }

  private startOfDay(date: Date): Date {
    const result = new Date(date);

    result.setHours(0, 0, 0, 0);

    return result;
  }
}
