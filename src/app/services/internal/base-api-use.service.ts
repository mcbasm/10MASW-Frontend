import { Type } from '@angular/core';
import { Pagination } from './../../types/types';
import { ApiCallService } from './../external/api-call.service';

export class BaseApiUseService {
  constructor(
    private apiService: ApiCallService,
    private _baseURL: string
  ) {}

  //#region METHODS
  getAll<T>(call: (res: T[]) => any): void {
    this.apiService
      .get<T[]>(this._baseURL)
      .subscribe((data: T[]) => call(data));
  }

  getPaginated<T>(pagination: Pagination, call: (res: T) => any): void {
    this.apiService
      .postPagination<T>(this._baseURL + '/paginated', pagination)
      .subscribe((data: T) => call(data));
  }

  getById<T>(_id: string, call: (res: T) => any): void {
    this.apiService
      .get<T>(this._baseURL + '/' + _id)
      .subscribe((data: T) => call(data));
  }

  create<T>(obj: T, call: (res: T) => any): void {
    this.apiService
      .post<T>(this._baseURL, obj)
      .subscribe((data: T) => call(data));
  }

  edit<T>(obj: T, call: (res: T) => any): void {
    this.apiService
      .put<T>(this._baseURL, obj)
      .subscribe((data: T) => call(data));
  }

  delete<T>(_id: string, call: (res: T) => any): void {
    this.apiService
      .delete<T>(this._baseURL + '/' + _id)
      .subscribe((data: T) => call(data));
  }
  //#endregion METHODS
}
