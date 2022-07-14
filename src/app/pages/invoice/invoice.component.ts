import { CURRENCIES } from './../../variables/GlobalVariables';
import { Currency } from './../../types/types';
import { InvoiceService } from './../../services/external/invoice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  //#endregion VARIABLES

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
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

  edit(_id: string) {
    this.router.navigate(['invoice/edit', _id]);
  }

  delete(_id: string) {
    if (confirm('¿Esta seguro?'))
      this.invoiceService.delete<Invoice>(_id, (res: Invoice) => {
        this.list();
      });
  }

  showFilter(modal: any): void {
    this.modalService.open(modal, { size: 'lg' }).result.then(
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
      currency: { label: 'Moneda' },
      deliveryDate: { label: 'Fecha Entrega' },
      provider: { label: 'Proveedor' },
    };
  }
}
