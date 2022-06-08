import { ErrorMessage } from './../../types/types';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
})
export class ErrorAlertComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() type!: ErrorMessage;
  @Input() message: string = 'Error';
  @Input() field!: string;
  @Input() fieldToCompare!: string;
  @Input() display: boolean = false;
  @Input() length!: number;
  @Input() format!: string;
  //#endregion INPUTS

  constructor() {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    switch (this.type) {
      case 'equal':
        this.message =
          "Los campos '" +
          this.field +
          "' y '" +
          this.fieldToCompare +
          "' deben ser iguales.";
        break;
      case 'format':
        this.message =
          "El campo '" +
          this.field +
          "' debe seguir el formato: '" +
          this.format +
          "'.";
        break;
      case 'minlength':
        this.message =
          "El campo '" +
          this.field +
          "' debe tener al menos '" +
          this.length +
          "' carácteres.";
        break;
      case 'maxlength':
        this.message =
          "El campo '" +
          this.field +
          "' debe tener máximo '" +
          this.length +
          "' carácteres.";
        break;
      case 'required':
        this.message = "El campo '" + this.field + "' es requerido.";
        break;
      case 'custom':
        // Just show the message received
        break;
    }
  }
  //#endregion LIFECYCLE
}
