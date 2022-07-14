import { AbstractControl, FormGroup } from '@angular/forms';

export class ReactiveFormsFunctions {
  getControl(form: FormGroup, controlName: string): AbstractControl {
    return form.get(controlName)!;
  }

  getValue(form: FormGroup, controlName: string): any {
    return this.getControl(form, controlName).value;
  }

  setValue(form: FormGroup, controlName: string, value: any): any {
    return this.getControl(form, controlName).setValue(value);
  }

  isControlInvalid(control: AbstractControl): boolean {
    return control?.invalid! && (control?.dirty! || control?.touched!);
  }

  hasControlError(control: AbstractControl, error: string): boolean {
    return !!control.errors && control.hasError(error);
  }
}
