import { ReactiveFormsFunctions } from './../../../functions/ReactiveFormsFunctions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/external/recipe.service';
import { ProductPicked, Currency, Recipe } from 'src/app/types/types';
import { CURRENCIES } from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-register-recipe',
  templateUrl: './register-recipe.component.html',
  styleUrls: ['./register-recipe.component.scss'],
})
export class RegisterRecipeComponent
  extends ReactiveFormsFunctions
  implements OnInit
{
  //#region DATA
  form!: FormGroup;
  products: ProductPicked[] = [];
  currencies: Currency[] = CURRENCIES;
  edition: boolean = false;
  private _id!: string;
  //#endregion DATA

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Inicializar el formulario */
    this.form = this.fb.group({
      currency: ['', Validators.required],
      name: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
    });

    /* Obtener el id en caso haya edicion */
    if (this.router.url.indexOf('/edit') > -1) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.edition = true;
      this.getRecipe();
    } else this.reset();
  }
  //#endregion LIFECYCLE

  //#region METHODS

  register() {
    this.edition ? this.edit() : this.save();
  }
  save() {
    this.recipeService.create<Recipe>(this.createObject(), (res: Recipe) => {
      if (res._id) {
        this.router.navigate(['recipe']);
      }
    });
  }

  edit() {
    this.recipeService.edit<Recipe>(
      this.createObject(),
      this._id,
      (res: Recipe) => {
        if (res._id) {
          this.router.navigate(['recipe']);
        }
      }
    );
  }

  addProduct(product: ProductPicked): void {
    this.products.push(product);
  }

  editProduct(product: ProductPicked): void {
    const editedProduct = this.products.find(
      (x) => x.product._id === product.product._id
    );
    if (!editedProduct) return;
    this.products[this.products.indexOf(editedProduct)] = product;
  }

  deleteProduct(_id: string): void {
    const deletedProduct = this.products.find((x) => x.product._id === _id);
    if (!deletedProduct) return;
    this.products.splice(this.products.indexOf(deletedProduct), 1);
  }

  reset() {
    this.products = [];
    this.setValue(this.form, 'currency', '€');
    this.setTotal(0);
  }

  private createObject(): Recipe {
    return {
      _id: this._id,
      currency: this.getValue(this.form, 'currency'),
      name: this.getValue(this.form, 'name'),
      products: this.products,
      total: this.getValue(this.form, 'total'),
    };
  }

  private setTotal(value: number): void {
    this.setValue(this.form, 'total', value);
  }

  private getRecipe(): void {
    this.recipeService.getById<Recipe>(this._id, (res: Recipe) => {
      if (res._id) {
        this.products = res.products;
        this.form.setValue({
          currency: res.currency,
          name: res.name,
          total: res.total,
        });
      }
    });
  }
  //#endregion METHODS
}
