import { MEASUREMENT_UNITS } from './../../variables/GlobalVariables';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ProductService } from './../../services/external/product.service';
import {
  Product,
  Pagination,
  PaginationResult,
  MeasurementUnits,
} from './../../types/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  //#region VARIABLES
  items: Product[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  measurementUnits: MeasurementUnits[] = MEASUREMENT_UNITS;
  filter: any;
  //#endregion VARIABLES

  constructor(
    private productService: ProductService,
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
    this.productService.getPaginated<Product>(
      this.pagination,
      (res: PaginationResult<Product>) => {
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
    this.router.navigate(['product/edit', _id]);
  }

  delete(_id: string) {
    if (confirm('¿Esta seguro?'))
      this.productService.delete<Product>(_id, (res: Product) => {
        this.list();
      });
  }

  showFilter(modal: any): void {
    this.modalService.open(modal, { size: 'lg' }).result.then(
      (res: any) => {
        if (res === 'filter') {
          this.list();
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
      name: { label: 'Nombre' },
      stock: { label: 'Stock actual' },
      minimumStock: { label: 'Stock mínimo' },
      measurementUnit: { label: 'Unidad de Medida' },
      status: { label: 'Estado', value: true },
    };
  }
  //#endregion METHODS
}
