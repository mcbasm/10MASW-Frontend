import { Router } from '@angular/router';
import { RecipeService } from './../../services/external/recipe.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import {
  Recipe,
  Pagination,
  Currency,
  PaginationResult,
} from 'src/app/types/types';
import {
  CURRENCIES,
  NGB_MODAL_OPTIONS,
} from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  //#region VARIABLES
  items: Recipe[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  filter: any;
  currencies: Currency[] = CURRENCIES;
  recipeSelected?: Recipe;
  //#endregion VARIABLES

  constructor(
    private recipeService: RecipeService,
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

    this.recipeService.getPaginated<Recipe>(
      this.pagination,
      (res: PaginationResult<Recipe>) => {
        this.items = res.items;
        this.pagination = res.pagination;
      }
    );
  }

  edit(_id: string): void {
    this.router.navigate(['recipe/edit', _id]);
  }

  delete(_id: string): void {
    if (confirm('¿Esta seguro?'))
      this.recipeService.delete<Recipe>(_id, (res: Recipe) => {
        this.list();
      });
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
  }

  detail(recipe: Recipe, modal: any) {
    this.recipeSelected = recipe;
    this.modalService
      .open(modal, NGB_MODAL_OPTIONS)
      .result.then(
        (res: any) => {},
        (rej: any) => {}
      )
      .finally(() => {
        this.recipeSelected = undefined;
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

  private initializeFilter(): void {
    this.filter = {
      name: { label: 'Nombre' },
      status: { label: 'Estado', value: true },
    };
  }
}
