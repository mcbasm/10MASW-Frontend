import { NGB_MODAL_OPTIONS } from './../../variables/GlobalVariables';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import {
  MeasurementUnits,
  Pagination,
  PaginationResult,
} from 'src/app/types/types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product, ProductPicked } from './../../types/types';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from 'src/app/services/external/product.service';
import { MEASUREMENT_UNITS } from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-product-picker',
  templateUrl: './product-picker.component.html',
  styleUrls: ['./product-picker.component.scss'],
})
export class ProductPickerComponent implements OnInit {
  //#region INPUTS
  @Input() items: ProductPicked[] = [];
  @Input() requiredTotal: boolean = false;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() addProductEvent: EventEmitter<ProductPicked> =
    new EventEmitter<ProductPicked>();
  @Output() editProductEvent: EventEmitter<ProductPicked> =
    new EventEmitter<ProductPicked>();
  @Output() deleteProductEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() itemsChange: EventEmitter<ProductPicked[]> = new EventEmitter<
    ProductPicked[]
  >();
  //#endregion OUTPUTS

  //#region DATA
  edition: boolean = false;
  selectedProduct: ProductPicked | null = null;
  //#endregion DATA

  constructor(private modalService: NgbModal) {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  //#endregion LIFECYCLE

  //#region METHODS
  add(product: ProductPicked): void {
    this.addProductEvent.emit(product);
  }

  edit(product: ProductPicked): void {
    this.editProductEvent.emit(product);
  }

  delete(_id: string): void {
    if (confirm('¿Esta seguro de eliminar el registro?'))
      this.deleteProductEvent.emit(_id);
  }

  showModal(modal: any, event: string, product?: ProductPicked): void {
    if (event === 'edit') {
      this.edition = true;
      this.selectedProduct = product!;
    }
    this.modalService
      .open(modal, NGB_MODAL_OPTIONS)
      .result.then(
        (res: any) => {
          this.clearSelection();
        },
        (rej: any) => {
          this.clearSelection();
        }
      );
  }

  private clearSelection(): void {
    this.edition = false;
    this.selectedProduct = null;
  }
  //#endregion METHODS
}
