import { Pagination, PaginationResult } from './../../types/types';
import { ApiCallService } from './../external/api-call.service';

export class BaseApiUseService {
  constructor(private apiService: ApiCallService, private _baseURL: string) {}

  //#region METHODS
  getAll<T>(
    call: (res: T[]) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService.get<T[]>(this._baseURL, authenticationRequired).subscribe({
      next: (data: T[]) => call(data),
      error: (error) => {
        alert(error.error.message || 'Error durante el proceso.');
      },
      complete: () => {},
    });
  }

  getPaginated<T>(
    pagination: Pagination,
    call: (res: PaginationResult<T>) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService
      .postPagination<T>(
        this._baseURL + '/paginated',
        pagination,
        authenticationRequired
      )
      .subscribe({
        next: (data: PaginationResult<T>) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  getById<T>(
    _id: string,
    call: (res: T) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService
      .get<T>(this._baseURL + '/' + _id, authenticationRequired)
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  create<T>(
    obj: T,
    call: (res: T) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService
      .post<T>(this._baseURL, obj, authenticationRequired)
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  edit<T>(
    obj: T,
    _id: string,
    call: (res: T) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService
      .put<T>(this._baseURL + '/' + _id, obj, authenticationRequired)
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  delete<T>(
    _id: string,
    call: (res: T) => any,
    authenticationRequired: boolean = true
  ): void {
    this.apiService
      .delete<T>(this._baseURL + '/' + _id, authenticationRequired)
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }

  protected customPost<T>(
    body: any,
    call: (res: T) => any,
    url?: string,
    authenticationRequired: boolean = true
  ) {
    this.apiService
      .post<T>(
        this._baseURL + (url ? '/' + url : ''),
        body,
        authenticationRequired
      )
      .subscribe({
        next: (data: T) => call(data),
        error: (error) => {
          alert(error.error.message || 'Error durante el proceso.');
        },
        complete: () => {},
      });
  }
  //#endregion METHODS
}
