import { BaseApiUseService } from './../internal/base-api-use.service';
import { ApiCallService } from './api-call.service';

import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'users');
  }
}
