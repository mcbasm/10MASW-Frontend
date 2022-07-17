import { Injectable } from '@angular/core';
import { BaseApiUseService } from '../internal/base-api-use.service';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'movement');
  }
}
