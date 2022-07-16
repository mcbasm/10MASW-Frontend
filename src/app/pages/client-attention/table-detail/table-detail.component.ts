import {
  HOURS_ARRAY,
  MINUTES_ARRAY,
} from './../../../variables/GlobalVariables';
import { UserService } from './../../../services/external/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from './../../../services/external/table.service';
import { Table, User } from './../../../types/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.scss'],
})
export class TableDetailComponent implements OnInit {
  //#region DATA
  private _id!: string;
  item!: Table;
  waiters: User[] = [];
  reserveHour: string[] = [];
  hours: string[] = HOURS_ARRAY;
  minutes: string[] = MINUTES_ARRAY;
  //#endregion DATA

  constructor(
    private userService: UserService,
    private tableService: TableService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Obtener el id en caso haya edicion */
    if (this.router.url.indexOf('/tableDetail') > -1) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.getTable();
      this.getWaiters();
    }
  }
  //#endregion LIFECYCLE

  //#region METHODS
  private getTable() {
    this.tableService.getById<Table>(this._id, (res: Table) => {
      this.item = res;
      this.reserveHour = res.reserveHour ? res.reserveHour.split(':') : [];
    });
  }

  private getWaiters() {
    this.userService.getByRole<User>('Waiter', (res: User[]) => {
      this.waiters = res;
    });
  }
  //#endregion METHODS
}
