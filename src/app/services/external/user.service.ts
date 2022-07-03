import { Pagination, PaginationResult, User } from './../../types/types';

import { BaseApiUseService } from './../internal/base-api-use.service';
import { ApiCallService } from './api-call.service';

import { Injectable, Type } from '@angular/core';
import { encrypt } from 'src/app/functions/Encryption';
import { AuthenticationService } from '../internal/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'users');
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
    (obj as unknown as User).password = encrypt(
      (obj as unknown as User).password
    );
    super.create<T>(obj, call, true);
  }

  override edit<T>(obj: T, _id: string, call: (res: T) => any): void {
    if ((obj as unknown as User).password) {
      (obj as unknown as User).password = encrypt(
        (obj as unknown as User).password
      );
    }
    super.edit<T>(obj, _id, call, true);
  }

  override delete<T>(_id: string, call: (res: T) => any): void {
    super.delete<T>(_id, call, true);
  }
}
