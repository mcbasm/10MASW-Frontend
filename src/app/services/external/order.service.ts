import { Order } from './../../types/types';
import { Injectable } from '@angular/core';
import { BaseApiUseService } from '../internal/base-api-use.service';
import { ApiCallService } from './api-call.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseApiUseService {
  constructor(apiService: ApiCallService) {
    super(apiService, 'order');
  }

  getByTable<Order>(tableId: string, call: (res: Order) => any) {
    super.customGet(call, 'byTable/' + tableId);
  }

  updateStatus<Order>(order: Order, call: (res: Order) => any) {
    super.customPost(order, call, 'updateStatus');
  }
}
