import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValidator(controlToCompare: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === controlToCompare.value
      ? null
      : { notEqual: control.value };
}

export function lessThanValidator(
  controlToCompare: AbstractControl
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value < controlToCompare.value ? null : { notLess: control.value };
}
