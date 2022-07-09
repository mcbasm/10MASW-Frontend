import { Pagination } from './../../types/types';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  @Input() filter: any = {};
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() pageSelected: EventEmitter<number> = new EventEmitter<number>();
  @Output() filterChange: EventEmitter<Pagination> =
    new EventEmitter<Pagination>();
  //#endregion OUTPUTS

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
  selectPage(index: number) {
    this.pageSelected.emit(index);
  }

  prevPage() {
    this.pageSelected.emit(this.pagination.page - 1);
  }

  nextPage() {
    this.pageSelected.emit(this.pagination.page + 1);
  }

  clearFilterItem(item: any) {
    this.filter[item.key].value = undefined;
    this.filterChange.emit(this.filter);
    this.selectPage(this.pagination.page);
  }

  private fillNumbersArray() {
    this.numbers = Array.from(Array(this.pagination.totalPages).keys());
  }
  //#endregion METHODS
}
