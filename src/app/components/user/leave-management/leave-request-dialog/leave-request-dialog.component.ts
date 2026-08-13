import { DatePipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CONSTANTS } from '../../../../shared/constants/constant';
import { LeaveType } from '../../../../shared/types/leave.types';
import { LeaveRequestResult } from '../../../../shared/types/leave-management.types';

export interface LeaveDialogData {
  remainingDays: number;
}

@Component({
  selector: 'hrms-leave-request-dialog',
  standalone: true,

  imports: [
    DatePipe,
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
  text = CONSTANTS.LEAVE_DIALOG;
  private readonly fb = inject(FormBuilder);

  private readonly dialogRef = inject(MatDialogRef<LeaveRequestDialogComponent>);


  readonly data = inject<LeaveDialogData>(MAT_DIALOG_DATA);

  readonly today = this.startOfDay(new Date());

  readonly form = this.fb.group({
    type: this.fb.nonNullable.control<LeaveType>('Sick Leave', Validators.required),

    from: this.fb.control<Date | null>(null, Validators.required),

    to: this.fb.control<Date | null>(null, Validators.required),

    reason: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(250),
    ]),
  });

  private readonly selectedType = toSignal(
    this.form.controls.type.valueChanges,
    { initialValue: this.form.controls.type.value },
  );

  private readonly selectedFrom = toSignal(
    this.form.controls.from.valueChanges,
    { initialValue: this.form.controls.from.value },
  );

  private readonly formEffects = effect(() => {
    this.selectedType();
    this.form.controls.from.reset();
    this.form.controls.to.reset();
  });

  private readonly balanceEffect = effect(() => {
    if (this.data.remainingDays <= 0) {
      this.form.disable();
    }
  });

  private readonly fromEffect = effect(() => {
    this.selectedFrom();
    this.form.controls.to.reset();
    this.updateToDateValidator();
  });


  get hasLeaveBalance(): boolean {
    return this.data.remainingDays > 0;
  }

  get isCasualLeave(): boolean {
    return this.form.controls.type.value === 'Casual Leave';
  }

  get minimumCasualDate(): Date {
    const date = new Date(this.today);

    date.setMonth(date.getMonth() + 1);

    return date;
  }
  get minimumFromDate(): Date {
    if (this.isCasualLeave) {
      return this.minimumCasualDate;
    }

    return this.today;
  }

  get maximumToDate(): Date | null {
    const from = this.form.controls.from.value;

    if (!from || !this.hasLeaveBalance) {
      return null;
    }

    const maximum = this.startOfDay(from);

    maximum.setDate(maximum.getDate() + this.data.remainingDays - 1);

    return maximum;
  }

  submit(): void {
    this.clearCustomErrors();

    this.form.markAllAsTouched();

    if (this.form.disabled || this.form.invalid) {
      return;
    }

    const { type, from, to, reason } = this.form.getRawValue();

    if (!from || !to) {
      return;
    }

    const startDate = this.startOfDay(from);

    const endDate = this.startOfDay(to);

    if (startDate < this.minimumFromDate) {
      this.form.controls.from.setErrors({
        invalidStartDate: true,
      });

      return;
    }
    if (endDate < startDate) {
      this.form.controls.to.setErrors({
        invalidRange: true,
      });

      return;
    }


    const days = this.calculateDays(startDate, endDate);

    if (days > this.data.remainingDays) {
      this.form.controls.to.setErrors({
        exceedsBalance: true,
      });

      return;
    }

    const maximum = this.maximumToDate;

    if (maximum && endDate > maximum) {
      this.form.controls.to.setErrors({
        exceedsBalance: true,
      });

      return;
    }

    const result: LeaveRequestResult = {
      type,
      from: startDate,
      to: endDate,
      days,
      reason: reason.trim(),
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  private calculateDays(from: Date, to: Date): number {
    const difference = this.startOfDay(to).getTime() - this.startOfDay(from).getTime();

    return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
  }


  private updateToDateValidator(): void {
    const validators = [Validators.required];

    const maximum = this.maximumToDate;

    if (maximum) {
      validators.push(this.maxDateValidator(maximum));
    }

    this.form.controls.to.setValidators(validators);

    this.form.controls.to.updateValueAndValidity({
      emitEvent: false,
    });
  }

  private maxDateValidator(maximum: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = this.startOfDay(new Date(control.value));

      return value > maximum
        ? {
            exceedsBalance: true,
          }
        : null;
    };
  }

  private clearCustomErrors(): void {
    this.removeError(this.form.controls.from, 'invalidStartDate');

    this.removeError(this.form.controls.to, 'invalidRange');

    this.removeError(this.form.controls.to, 'exceedsBalance');
  }

  private removeError(control: AbstractControl, key: string): void {
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
