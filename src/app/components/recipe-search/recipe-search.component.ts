import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import { RecipeService } from 'src/app/services/external/recipe.service';
import {
  RecipePicked,
  Recipe,
  Pagination,
  PaginationResult,
} from 'src/app/types/types';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss'],
})
export class RecipeSearchComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() recipesPicked: RecipePicked[] = [];
  @Input() edition: boolean = false;
  @Input() selectedRecipe: RecipePicked | null = null;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() addRecipe: EventEmitter<RecipePicked> =
    new EventEmitter<RecipePicked>();
  @Output() editRecipe: EventEmitter<RecipePicked> =
    new EventEmitter<RecipePicked>();
  //#endregion OUTPUTS

  //#region DATA
  items: Recipe[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  filter: any;
  disabledIndexes: number[] = [];
  //#endregion DATA

  constructor(
    private recipeService: RecipeService,
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
      this.editRecipe.emit(this.selectedRecipe!);
      this.modalService.dismissAll();
    } else {
      this.addRecipe.emit(this.selectedRecipe!);
    }
    this.selectedRecipe = null;
    this.getDisabledIndexes();
  }

  selectRecipe(recipe: Recipe, index: number) {
    if (
      this.selectedRecipe?._id === recipe._id ||
      this.disabledIndexes.includes(index)
    )
      return;
    this.initializeSelectedRecipe(recipe);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  list() {
    this.disabledIndexes = [];
    this.pagination.filter = buildFilter(this.filter);
    this.recipeService.getPaginated<Recipe>(
      this.pagination,
      (res: PaginationResult<Recipe>) => {
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

  private initializeSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe = {
      recipe,
      quantity: 0,
    };
  }

  private getDisabledIndexes() {
    // Deshabilitar los indexes que ya se encuentren seleccionados
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (this.recipesPicked.find((x) => x.recipe._id === element._id)) {
        this.disabledIndexes.push(index);
      }
    }
  }
  //#endregion METHODS
}
