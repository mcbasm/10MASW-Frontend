import { CURRENCIES, HOURS_ARRAY } from './../../../variables/GlobalVariables';
import { Router } from '@angular/router';
import { Currency, Invoice, ProductPicked } from 'src/app/types/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsFunctions } from 'src/app/functions/ReactiveFormsFunctions';
import { InvoiceService } from 'src/app/services/external/invoice.service';

@Component({
  selector: 'app-register-invoice',
  templateUrl: './register-invoice.component.html',
  styleUrls: ['./register-invoice.component.scss'],
})
export class RegisterInvoiceComponent
  extends ReactiveFormsFunctions
  implements OnInit
{
  //#region DATA
  form!: FormGroup;
  products: ProductPicked[] = [];
  hours: string[] = HOURS_ARRAY;
  currencies: Currency[] = CURRENCIES;
  //#endregion DATA

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    super();
  }

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Inicializar el formulario */
    this.form = this.fb.group({
      buyDate: ['', Validators.required],
      buyDateHour: ['', Validators.required],
      buyDateMinute: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(59),
        ]),
      ],
      deliveryDate: ['', Validators.required],
      deliveryDateHour: ['', Validators.required],
      deliveryDateMinute: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
          Validators.max(59),
        ]),
      ],
      billNumber: ['', Validators.required],
      currency: ['', Validators.required],
      provider: ['', Validators.required],
      total: [{ value: 0, disabled: true }, Validators.required],
    });

    this.reset();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  save() {
    if (
      confirm(
        'Los valores no podrán ser modificados una vez registrados. ¿Esta seguro de realizar la operación?'
      )
    )
      this.invoiceService.create<Invoice>(
        this.createObject(),
        (res: Invoice) => {
          if (res._id) {
            this.router.navigate(['invoice']);
          }
        }
      );
  }

  addProduct(product: ProductPicked): void {
    this.products.push(product);
    this.calculateCurrentTotal();
  }

  editProduct(product: ProductPicked): void {
    const editedProduct = this.products.find(
      (x) => x.product._id === product.product._id
    );
    if (!editedProduct) return;
    this.products[this.products.indexOf(editedProduct)] = product;
    this.calculateCurrentTotal();
  }

  deleteProduct(_id: string): void {
    const deletedProduct = this.products.find((x) => x.product._id === _id);
    if (!deletedProduct) return;
    this.products.splice(this.products.indexOf(deletedProduct), 1);
    this.calculateCurrentTotal();
  }

  reset() {
    this.products = [];
    this.setValue(this.form, 'currency', '€');
    this.setTotal(0);
  }

  private createObject(): Invoice {
    return {
      billNumber: this.getValue(this.form, 'billNumber'),
      buyDate: (this.getValue(this.form, 'buyDate') as string).concat(
        ' ',
        this.getValue(this.form, 'buyDateHour'),
        ':',
        (this.getValue(this.form, 'buyDateMinute') as number) <= 9
          ? '0'.concat(this.getValue(this.form, 'buyDateMinute') as string)
          : (this.getValue(this.form, 'buyDateMinute') as string)
      ),
      currency: this.getValue(this.form, 'currency'),
      deliveryDate: (this.getValue(this.form, 'deliveryDate') as string).concat(
        ' ',
        this.getValue(this.form, 'deliveryDateHour'),
        ':',
        (this.getValue(this.form, 'deliveryDateMinute') as number) <= 9
          ? '0'.concat(this.getValue(this.form, 'deliveryDateMinute') as string)
          : (this.getValue(this.form, 'deliveryDateMinute') as string)
      ),
      products: this.products,
      provider: this.getValue(this.form, 'provider'),
      total: this.getValue(this.form, 'total'),
    };
  }

  private setTotal(value: number): void {
    this.setValue(this.form, 'total', value);
  }

  private calculateCurrentTotal() {
    this.setTotal(this.products.reduce((p, c) => p + +(c.total || 0), 0));
  }
  //#endregion METHODS
}
