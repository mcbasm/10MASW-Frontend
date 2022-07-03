import { AuthenticationService } from './../internal/authentication.service';
import { BaseApiUseService } from './../internal/base-api-use.service';
import { Role } from './../../types/types';
import { ApiCallService } from './api-call.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService extends BaseApiUseService {
  constructor(
    apiService: ApiCallService
  ) {
    super(apiService, 'role');
  }
}
