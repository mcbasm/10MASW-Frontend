import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { buildFilter } from 'src/app/functions/FilterFunctions';
import { MovementService } from 'src/app/services/external/movement.service';
import { Movement, Pagination, PaginationResult } from 'src/app/types/types';
import { NGB_MODAL_OPTIONS } from 'src/app/variables/GlobalVariables';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss'],
})
export class MovementsComponent implements OnInit {
  //#region VARIABLES
  items: Movement[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  movementTypes: string[] = ['Entrada', 'Salida'];
  filter: any;
  //#endregion VARIABLES

  constructor(
    private movementService: MovementService,
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

    this.movementService.getPaginated<Movement>(
      this.pagination,
      (res: PaginationResult<Movement>) => {
        this.items = res.items;
        this.pagination = res.pagination;
      }
    );
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
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
      type: { label: 'Tipo' },
    };
  }
}
