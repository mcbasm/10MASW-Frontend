import { Pagination } from './../../types/types';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit, OnChanges {
  //#region INPUTS
  @Input() pagination: Pagination = {
    limit: 10,
    currentPage: 1,
    totalItems: 0,
    totalPages: 1,
  };
  //#endregion INPUTS

  //#region DATA
  numbers: number[] = [];
  //#endregion DATA

  constructor() {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.fillNumbersArray();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fillNumbersArray();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  private fillNumbersArray() {
    this.numbers = Array.from(Array(this.pagination.totalPages).keys());
  }
  //#endregion METHODS
}
