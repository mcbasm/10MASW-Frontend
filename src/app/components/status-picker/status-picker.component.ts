import { ReactiveFormsFunctions } from './../../functions/ReactiveFormsFunctions';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-status-picker',
  templateUrl: './status-picker.component.html',
  styleUrls: ['./status-picker.component.scss'],
})
export class StatusPickerComponent implements OnInit {
  //#region DATA
  radio!: FormControl;
  //#endregion DATA

  //#region INPUTS
  @Input() required: boolean = false;
  @Input() status: boolean = true;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() statusChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  //#endregion OUTPUTS

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    /* Inicializar el formulario */
    this.radio = this.fb.control({
      status: ['', this.required ? Validators.required : undefined],
    });

    this.radio.setValue(this.status);

    // Escuchar los cambios en el status
    this.radio.valueChanges.subscribe((data: boolean) => {
      this.status = data;
      this.statusChange.emit(data);
    });
  }
}
