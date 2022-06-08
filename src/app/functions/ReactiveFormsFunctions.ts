import { AbstractControl, FormGroup } from '@angular/forms';

export class ReactiveFormsFunctions {
  getControl(form: FormGroup, controlName: string): AbstractControl {
    return form.get(controlName)!;
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control?.invalid! && (control?.dirty! || control?.touched!);
  }

  hasControlError(control: AbstractControl, error: string): boolean {
    return !!control.errors && control.hasError(error);
  }
}
