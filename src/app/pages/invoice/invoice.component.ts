import {
  CURRENCIES,
  NGB_MODAL_OPTIONS,
} from './../../variables/GlobalVariables';
import { Currency } from './../../types/types';
import { InvoiceService } from './../../services/external/invoice.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import { Invoice, Pagination, PaginationResult } from 'src/app/types/types';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  //#region VARIABLES
  items: Invoice[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  filter: any;
  currencies: Currency[] = CURRENCIES;
  invoiceSelected?: Invoice;
  //#endregion VARIABLES

  constructor(
    private invoiceService: InvoiceService,
    private modalService: NgbModal
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.reload();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list() {
    this.pagination.filter = buildFilter(this.filter);

    this.invoiceService.getPaginated<Invoice>(
      this.pagination,
      (res: PaginationResult<Invoice>) => {
        this.items = res.items;
        this.pagination = res.pagination;
      }
    );
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
  }

  detail(invoice: Invoice, modal: any) {
    this.invoiceSelected = invoice;
    this.modalService
      .open(modal, NGB_MODAL_OPTIONS)
      .result.then(
        (res: any) => {},
        (rej: any) => {}
      )
      .finally(() => {
        this.invoiceSelected = undefined;
      });
  }

  showFilter(modal: any): void {
    this.modalService.open(modal, NGB_MODAL_OPTIONS).result.then(
      (res: any) => {
        if (res === 'filter') {
          setTimeout(() => {
            this.list();
          }, 100);
        }
      },
      (rej: any) => {}
    );
  }

  reload() {
    this.initializeFilter();
    this.list();
  }

  private initializeFilter(): void {
    this.filter = {
      buyDate: { label: 'Fecha Compra' },
      currency: { label: 'Moneda', isUnique: true },
      deliveryDate: { label: 'Fecha Entrega' },
      provider: { label: 'Proveedor' },
    };
  }
}
