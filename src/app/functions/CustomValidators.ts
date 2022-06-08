import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValidator(controlToEqual: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null =>
    control.value === controlToEqual.value ? null : { notEqual: control.value };
}
