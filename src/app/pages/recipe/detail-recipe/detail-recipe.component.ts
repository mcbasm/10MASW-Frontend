import { Recipe } from './../../../types/types';
import {
  Component,
  OnInit,
  OnChanges,
  Input,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.scss'],
})
export class DetailRecipeComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() item?: Recipe;
  //#endregion INPUTS

  //#region DATA
  totalAmount?: string;
  //#endregion DATA

  constructor() {}

  //#region LIFECYCLE
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.item)
      this.totalAmount = this.item.currency
        .concat(' ')
        .concat(this.item.total.toString());
    else this.totalAmount = undefined;
  }
  //#endregion LIFECYCLE
}
