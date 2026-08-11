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
import { LeaveRequestResult, LeaveType } from '../../../../shared/types/leave-management';

export interface LeaveDialogData {
  remainingDays: number;
}

@Component({
  selector: 'app-leave-request-dialog',
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
  templateUrl: './leave-request-dialog.component.html',
  styleUrl: './leave-request-dialog.component.scss',
})
export class LeaveRequestDialogComponent {
  private readonly fb = inject(FormBuilder);
  today=new Date();

  private readonly dialogRef = inject(MatDialogRef<LeaveRequestDialogComponent>);

  readonly data = inject<LeaveDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    type: this.fb.nonNullable.control<LeaveType>('Sick Leave', Validators.required),

    from: this.fb.control<Date | null>(null, Validators.required),

    to: this.fb.control<Date | null>(null, Validators.required),

    reason: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5)]),
  });

  get isCasualLeave(): boolean {
    return this.form.controls.type.value === 'Casual Leave';
  }

  get minimumCasualDate(): Date {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    date.setMonth(date.getMonth() + 1);

    return date;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    const { type, from, to, reason } = this.form.getRawValue();

    if (!from || !to) {
      return;
    }

    if (to < from) {
      this.form.controls.to.setErrors({
        invalidRange: true,
      });

      return;
    }

    if (type === 'Casual Leave' && from < this.minimumCasualDate) {
      this.form.controls.from.setErrors({
        advanceRequired: true,
      });

      return;
    }

    const days = this.calculateDays(from, to);

    if (days > this.data.remainingDays) {
      this.form.controls.to.setErrors({
        exceedsBalance: true,
      });

      return;
    }

    const result: LeaveRequestResult = {
      type,
      from,
      to,
      days,
      reason,
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private calculateDays(from: Date, to: Date): number {
    const start = new Date(from);

    const end = new Date(to);

    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const difference = end.getTime() - start.getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
  }
}
