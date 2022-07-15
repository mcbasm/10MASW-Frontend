import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaginationResult, ProductPicked } from './../../types/types';
import { ProductService } from 'src/app/services/external/product.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Product, Pagination, MeasurementUnits } from 'src/app/types/types';
import { MEASUREMENT_UNITS } from 'src/app/variables/GlobalVariables';
import { buildFilter } from 'src/app/functions/FilterFunctions';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() productsPicked: ProductPicked[] = [];
  @Input() requiredTotal: boolean = false;
  @Input() edition: boolean = false;
  @Input() selectedProduct: ProductPicked | null = null;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() addProduct: EventEmitter<ProductPicked> =
    new EventEmitter<ProductPicked>();
  @Output() editProduct: EventEmitter<ProductPicked> =
    new EventEmitter<ProductPicked>();
  //#endregion OUTPUTS

  //#region DATA
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
  disabledIndexes: number[] = [];
  //#endregion DATA

  constructor(
    private productService: ProductService,
    private modalService: NgbModal
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.reload();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDisabledIndexes();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  save() {
    if (this.edition) {
      this.editProduct.emit(this.selectedProduct!);
      this.modalService.dismissAll();
    } else {
      this.addProduct.emit(this.selectedProduct!);
    }
    this.selectedProduct = null;
    this.getDisabledIndexes();
  }

  selectProduct(product: Product, index: number) {
    if (
      this.selectedProduct?._id === product._id ||
      this.disabledIndexes.includes(index)
    )
      return;
    this.initializeSelectedProduct(product);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  list() {
    this.disabledIndexes = [];
    this.pagination.filter = buildFilter(this.filter);
    this.productService.getPaginated<Product>(
      this.pagination,
      (res: PaginationResult<Product>) => {
        this.items = res.items;
        this.getDisabledIndexes();
        this.pagination = res.pagination;
      }
    );
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
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

  private initializeSelectedProduct(product: Product) {
    this.selectedProduct = {
      product,
      quantity: 0,
      total: 0,
    };
  }

  private getDisabledIndexes() {
    // Deshabilitar los indexes que ya se encuentren seleccionados
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (this.productsPicked.find((x) => x.product._id === element._id)) {
        this.disabledIndexes.push(index);
      }
    }
  }
  //#endregion METHODS
}
