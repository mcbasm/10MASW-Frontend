import { AuthenticationService } from './../internal/authentication.service';
import { BaseApiUseService } from './../internal/base-api-use.service';
import { Role, Pagination, PaginationResult } from './../../types/types';
import { ApiCallService } from './api-call.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'role');
  }

  override getAll<T>(call: (res: T[]) => any): void {
    super.getAll<T>(call, true);
  }

  override getById<T>(_id: string, call: (res: T) => any): void {
    super.getById(_id, call, true);
  }

  override getPaginated<T>(
    pagination: Pagination,
    call: (res: PaginationResult<T>) => any
  ): void {
    super.getPaginated(pagination, call, true);
  }

  override create<T>(obj: T, call: (res: T) => any): void {
    super.create<T>(obj, call, true);
  }

  override edit<T>(obj: T, _id: string, call: (res: T) => any): void {
    super.edit<T>(obj, _id, call, true);
  }

  override delete<T>(_id: string, call: (res: T) => any): void {
    super.delete<T>(_id, call, true);
  }
}
