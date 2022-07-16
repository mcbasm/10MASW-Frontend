import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './../../services/external/order.service';
import { Pagination, PaginationResult } from 'src/app/types/types';
import { Order } from './../../types/types';
import { Component, OnInit } from '@angular/core';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import { NGB_MODAL_OPTIONS } from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  //#region VARIABLES
  items: Order[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  filter: any;
  statusList: any[] = [
    { value: 1, content: 'Pendiente' },
    { value: 2, content: 'En preparación' },
    { value: 3, content: 'Atendido' },
    { value: 4, content: 'Completada' },
    { value: 5, content: 'Cancelada' },
  ];
  orderSelected?: Order;
  //#endregion VARIABLES

  constructor(
    private orderService: OrderService,
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

    this.orderService.getPaginated<Order>(
      this.pagination,
      (res: PaginationResult<Order>) => {
        this.items = res.items;
        this.pagination = res.pagination;

        const status = this.statusList.find(
          (x) => x.value === this.pagination.filter.status
        );

        this.filter.status.content = status.content;
      }
    );
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
  }

  detail(order: Order, modal: any) {
    this.orderSelected = order;
    this.modalService
      .open(modal, NGB_MODAL_OPTIONS)
      .result.then(
        (res: any) => {},
        (rej: any) => {}
      )
      .finally(() => {
        this.orderSelected = undefined;
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

  changeStatus(status: number) {
    this.orderSelected!.status = status;
    this.orderService.updateStatus<Order>(this.orderSelected!, (res: Order) => {
      if (status == 3) this.modalService.dismissAll();
      this.list();
    });
  }

  private initializeFilter(): void {
    this.filter = {
      status: { label: 'Estado', value: 1 },
    };
  }
}
