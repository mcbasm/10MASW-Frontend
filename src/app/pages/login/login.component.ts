import { TokenPayload } from './../../types/types';
import { ReactiveFormsFunctions } from './../../functions/ReactiveFormsFunctions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/external/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ReactiveFormsFunctions implements OnInit {
  //#region DATA
  form!: FormGroup;
  //#endregion DATA

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    super();
  }

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Construir el formulario */
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }
  //#endregion LIFECYCLE

  //#region METHODS
  login() {
    // Construir el objeto
    const user: TokenPayload = {
      email: this.getControl(this.form, 'email').value,
      password: this.getControl(this.form, 'password').value,
    };

    this.loginService.login(user);
  }
  //#endregion METHODS
}
