import { AuthenticationService } from './../internal/authentication.service';
import { Pagination, PaginationResult } from './../../types/types';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  //#region VARIABLES
  private apiURL = environment.backendAPI;
  //#endregion VARIABLES

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  //#region METHODS
  get<T>(url: string, authenticationRequired: boolean = true) {
    return this.http.get<T>(
      this.apiURL + url,
      authenticationRequired ? this.generateHeaders() : undefined
    );
  }
  post<T>(url: string, body: T | T[], authenticationRequired: boolean = true) {
    return this.http.post<T>(
      this.apiURL + url,
      body,
      authenticationRequired ? this.generateHeaders() : undefined
    );
  }
  postPagination<T>(
    url: string,
    pagination: Pagination,
    authenticationRequired: boolean = true
  ) {
    return this.http.post<PaginationResult<T>>(
      this.apiURL + url,
      pagination,
      authenticationRequired ? this.generateHeaders() : undefined
    );
  }
  put<T>(url: string, body: T | T[], authenticationRequired: boolean = true) {
    return this.http.put<T>(
      this.apiURL + url,
      body,
      authenticationRequired ? this.generateHeaders() : undefined
    );
  }
  delete<T>(url: string, authenticationRequired: boolean = true) {
    return this.http.delete<T>(
      this.apiURL + url,
      authenticationRequired ? this.generateHeaders() : undefined
    );
  }

  private generateHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    };
  }
  //#endregion METHODS
}
