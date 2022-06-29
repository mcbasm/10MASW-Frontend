import { User } from './../../types/types';

import { BaseApiUseService } from './../internal/base-api-use.service';
import { ApiCallService } from './api-call.service';

import { Injectable, Type } from '@angular/core';
import { encrypt } from 'src/app/functions/Encryption';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'users');
  }

  override create<T>(obj: T, call: (res: T) => any): void {
    (obj as unknown as User).password = encrypt(
      (obj as unknown as User).password
    );
    super.create<T>(obj, call);
  }

  override edit<T>(obj: T, _id: string, call: (res: T) => any): void {
    if ((obj as unknown as User).password) {
      (obj as unknown as User).password = encrypt(
        (obj as unknown as User).password
      );
    }
    super.edit<T>(obj, _id, call);
  }
}
