import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/external/product.service';
import { MeasurementUnits, Product } from './../../../types/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsFunctions } from './../../../functions/ReactiveFormsFunctions';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.scss'],
})
export class RegisterProductComponent
  extends ReactiveFormsFunctions
  implements OnInit
{
  //#region DATA
  form!: FormGroup;
  private _id: string | undefined;
  edition: boolean = false;
  measurementUnits: MeasurementUnits[] = ['gr', 'kg', 'lt', 'pkg'];
  //#endregion DATA

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    /* Construir el formulario */
    this.form = this.fb.group({
      measurementUnit: ['', Validators.required],
      minimumStock: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      name: ['', Validators.required],
      stock: ['', Validators.compose([Validators.required, Validators.min(0)])],
    });

    /* Obtener el id en caso haya edicion */
    if (this.router.url.indexOf('/edit') > -1) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.edition = true;
      this.getProduct();
    }
  }

  //#region METHODS
  register() {
    this.edition ? this.edit() : this.save();
  }

  private save() {
    this.productService.create<Product>(this.createObject(), (res: Product) => {
      if (res._id) {
        this.router.navigate(['product']);
      }
    });
  }

  private edit() {
    this.productService.edit<Product>(
      this.createObject(),
      this._id!,
      (res: Product) => {
        if (res._id) {
          this.router.navigate(['product']);
        }
      }
    );
  }

  private getProduct() {
    this.productService.getById<Product>(this._id!, (res: Product) => {
      this.form.setValue({
        measurementUnit: res.measurementUnit,
        minimumStock: res.minimumStock,
        name: res.name,
        stock: res.stock,
      });
    });
  }

  private createObject(): Product {
    return {
      measurementUnit: this.form.value.measurementUnit,
      minimumStock: this.form.value.minimumStock,
      name: this.form.value.name,
      stock: this.form.value.stock,
      status: this.form.value.status,
      _id: this._id,
    };
  }
  //#endregion METHODS
}
