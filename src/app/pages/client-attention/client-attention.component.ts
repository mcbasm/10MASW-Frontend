import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from './../../services/external/table.service';
import { Table } from './../../types/types';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-attention',
  templateUrl: './client-attention.component.html',
  styleUrls: ['./client-attention.component.scss'],
})
export class ClientAttentionComponent implements OnInit {
  //#region DATA
  tables: Table[] = [];
  generalInfo: any = {};
  //#endregion DATA

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tableService: TableService
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.list();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list() {
    this.tableService.getAll<Table>((res: Table[]) => {
      this.tables = res;
      this.generateInfo();
    });
  }

  selectTable(table: Table) {
    this.router.navigate(['tableDetail', table._id], {
      relativeTo: this.activatedRoute,
    });
  }

  private generateInfo() {
    this.generalInfo = {
      total: this.tables.length,
      availableTables: this.tables.filter((x) => x.availability === 1).length,
      inUseTables: this.tables.filter((x) => x.availability === 3).length,
      reservedTables: this.tables.filter((x) => x.availability === 2).length,
    };
  }
  //#endregion METHODS
}
