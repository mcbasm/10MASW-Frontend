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
  private authenticationHeaders;
  //#endregion VARIABLES

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationHeaders = {
      headers: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`,
      },
    };
  }

  //#region METHODS
  get<T>(url: string, authenticationRequired: boolean = false) {
    return this.http.get<T>(
      this.apiURL + url,
      authenticationRequired ? this.authenticationHeaders : undefined
    );
  }
  post<T>(url: string, body: T | T[], authenticationRequired: boolean = false) {
    return this.http.post<T>(
      this.apiURL + url,
      body,
      authenticationRequired ? this.authenticationHeaders : undefined
    );
  }
  postPagination<T>(
    url: string,
    pagination: Pagination,
    authenticationRequired: boolean = false
  ) {
    return this.http.post<PaginationResult<T>>(
      this.apiURL + url,
      pagination,
      authenticationRequired ? this.authenticationHeaders : undefined
    );
  }
  put<T>(url: string, body: T | T[], authenticationRequired: boolean = false) {
    return this.http.put<T>(
      this.apiURL + url,
      body,
      authenticationRequired ? this.authenticationHeaders : undefined
    );
  }
  delete<T>(url: string, authenticationRequired: boolean = false) {
    return this.http.delete<T>(
      this.apiURL + url,
      authenticationRequired ? this.authenticationHeaders : undefined
    );
  }
  //#endregion METHODS
}
