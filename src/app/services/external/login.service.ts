import { encrypt } from 'src/app/functions/Encryption';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TokenPayload, TokenResponse } from './../../types/types';
import { AuthenticationService } from './../internal/authentication.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  //#region VARIABLES
  private apiURL = environment.backendAPI;
  //#endregion VARIABLES

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  login(user: TokenPayload) {
    // Encriptar el password
    user.password = encrypt(user.password);

    this.http
      .post<TokenResponse>(this.apiURL + 'authentication', user)
      .subscribe({
        next: (data: TokenResponse) => {
          if (data.token) {
            this.auth.saveToken(data.token);
            this.router.navigate(['/home']);
          }
          return data;
        },
        error: (error) => {
          alert(error.error.message);
        },
        complete: () => {},
      });
  }
}
