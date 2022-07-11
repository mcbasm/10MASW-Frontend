import { ApiCallService } from './api-call.service';
import { BaseApiUseService } from './../internal/base-api-use.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'invoice');
  }
}
