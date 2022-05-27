import { Pagination } from './../../types/types';
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

  constructor(private http: HttpClient) {}

  //#region METHODS
  get<T>(url: string) {
    return this.http.get<T>(this.apiURL + url);
  }
  post<T>(url: string, body: T | T[]) {
    return this.http.post<T>(this.apiURL + url, body);
  }
  postPagination<T>(url: string, pagination: Pagination) {
    return this.http.post<T>(this.apiURL + url, pagination);
  }
  put<T>(url: string, body: T | T[]) {
    return this.http.put<T>(this.apiURL + url, body);
  }
  delete<T>(url: string) {
    return this.http.delete<T>(this.apiURL + url);
  }
  //#endregion METHODS
}
