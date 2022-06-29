import { ReactiveFormsFunctions } from './../../functions/ReactiveFormsFunctions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ReactiveFormsFunctions implements OnInit {
  //#region DATA
  form!: FormGroup;
  //#endregion DATA

  constructor(private fb: FormBuilder) {
    super();
  }

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Construir el formulario */
    this.form = this.fb.group({
      user: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  //#endregion LIFECYCLE

  //#region METHODS
  login() {}
  //#endregion METHODS
}
