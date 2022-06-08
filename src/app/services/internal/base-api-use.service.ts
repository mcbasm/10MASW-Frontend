import { Type } from '@angular/core';
import { Pagination } from './../../types/types';
import { ApiCallService } from './../external/api-call.service';

export class BaseApiUseService {
  constructor(private apiService: ApiCallService, private _baseURL: string) {}

  //#region METHODS
  getAll<T>(call: (res: T[]) => any): void {
    this.apiService.get<T[]>(this._baseURL).subscribe({
      next: (data: T[]) => call(data),
      error: (error) => {
        alert('Error durante el proceso.');
      },
      complete: () => {},
    });
  }

  getPaginated<T>(pagination: Pagination, call: (res: T) => any): void {
    this.apiService
      .postPagination<T>(this._baseURL + '/paginated', pagination)
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert('Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  getById<T>(_id: string, call: (res: T) => any): void {
    this.apiService.get<T>(this._baseURL + '/' + _id).subscribe({
      next: (data: T) => call(data),
      error: (error) => {
        alert('Error durante el proceso.');
      },
      complete: () => {},
    });
  }

  create<T>(obj: T, call: (res: T) => any): void {
    this.apiService.post<T>(this._baseURL, obj).subscribe({
      next: (data: T) => call(data),
      error: (error) => {
        alert('Error durante el proceso.');
      },
      complete: () => {},
    });
  }

  edit<T>(obj: T, _id: string, call: (res: T) => any): void {
    this.apiService.put<T>(this._baseURL + '/' + _id, obj).subscribe({
      next: (data: T) => call(data),
      error: (error) => {
        alert('Error durante el proceso.');
      },
      complete: () => {},
    });
  }

  delete<T>(_id: string, call: (res: T) => any): void {
    this.apiService.delete<T>(this._baseURL + '/' + _id).subscribe({
      next: (data: T) => call(data),
      error: (error) => {
        alert('Error durante el proceso.');
      },
      complete: () => {},
    });
  }
  //#endregion METHODS
}
