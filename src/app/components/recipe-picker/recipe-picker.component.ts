import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecipePicked } from 'src/app/types/types';
import { NGB_MODAL_OPTIONS } from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-recipe-picker',
  templateUrl: './recipe-picker.component.html',
  styleUrls: ['./recipe-picker.component.scss'],
})
export class RecipePickerComponent implements OnInit {
  //#region INPUTS
  @Input() items: RecipePicked[] = [];
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() addRecipeEvent: EventEmitter<RecipePicked> =
    new EventEmitter<RecipePicked>();
  @Output() editRecipeEvent: EventEmitter<RecipePicked> =
    new EventEmitter<RecipePicked>();
  @Output() deleteRecipeEvent: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() itemsChange: EventEmitter<RecipePicked[]> = new EventEmitter<
    RecipePicked[]
  >();
  //#endregion OUTPUTS

  //#region DATA
  edition: boolean = false;
  selectedRecipe: RecipePicked | null = null;
  //#endregion DATA

  constructor(private modalService: NgbModal) {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  //#endregion LIFECYCLE

  //#region METHODS
  add(recipe: RecipePicked): void {
    this.addRecipeEvent.emit(recipe);
  }

  edit(recipe: RecipePicked): void {
    this.editRecipeEvent.emit(recipe);
  }

  delete(_id: string): void {
    if (confirm('¿Esta seguro de eliminar el registro?'))
      this.deleteRecipeEvent.emit(_id);
  }

  showModal(modal: any, event: string, recipe?: RecipePicked): void {
    if (event === 'edit') {
      this.edition = true;
      this.selectedRecipe = recipe!;
    }
    this.modalService.open(modal, NGB_MODAL_OPTIONS).result.then(
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
    this.selectedRecipe = null;
  }
  //#endregion METHODS
}
