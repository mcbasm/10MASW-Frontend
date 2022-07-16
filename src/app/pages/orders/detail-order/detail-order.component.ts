import { Order } from './../../../types/types';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.scss'],
})
export class DetailOrderComponent implements OnInit {
  //#region INPUTS
  @Input() item?: Order;
  //#endregion INPUTS

  //#region DATA
  totalAmount?: string;
  //#endregion DATA

  constructor() {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item)
      this.totalAmount = this.item.recipes[0].recipe.currency
        .concat(' ')
        .concat(this.item.total?.toString() || '');
    else this.totalAmount = undefined;
  }
  //#endregion LIFECYCLE

}
