import { BaseApiUseService } from './../internal/base-api-use.service';
import { User } from './../../types/types';
import { ApiCallService } from './api-call.service';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'users');
  }
}
