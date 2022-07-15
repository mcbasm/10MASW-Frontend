import { Invoice } from './../../../types/types';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.scss'],
})
export class DetailInvoiceComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() item?: Invoice;
  //#endregion INPUTS

  //#region DATA
  totalAmount?: string;
  //#endregion DATA

  constructor() {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item)
      this.totalAmount = this.item.currency
        .concat(' ')
        .concat(this.item.total.toString());
    else this.totalAmount = undefined;
  }
  //#endregion LIFECYCLE
}
