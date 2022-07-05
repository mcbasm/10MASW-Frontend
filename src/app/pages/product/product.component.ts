import { Router } from '@angular/router';
import { ProductService } from './../../services/external/product.service';
import { Product, Pagination, PaginationResult } from './../../types/types';
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
  };
  //#endregion VARIABLES

  constructor(private productService: ProductService, private router: Router) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.list();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list() {
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
  //#endregion METHODS
}
