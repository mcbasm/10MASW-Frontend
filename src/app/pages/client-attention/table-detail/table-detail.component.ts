import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './../../../services/external/order.service';
import {
  HOURS_ARRAY,
  MINUTES_ARRAY,
  NGB_MODAL_OPTIONS,
} from './../../../variables/GlobalVariables';
import { UserService } from './../../../services/external/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TableService } from './../../../services/external/table.service';
import { Table, User, RecipePicked, Order } from './../../../types/types';
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
  order?: Order;
  recipes: RecipePicked[] = [];
  waiters: User[] = [];
  reserveHour: string[] = [];
  hours: string[] = HOURS_ARRAY;
  minutes: string[] = MINUTES_ARRAY;
  disableButtons: boolean = false;
  //#endregion DATA

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private tableService: TableService,
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    /* Obtener el id en caso haya edicion */
    if (this.router.url.indexOf('/tableDetail') > -1) {
      this._id = this.activatedRoute.snapshot.paramMap.get('id')!;
      this.getTable();
      this.getOrder();
      this.getWaiters();
    }
  }
  //#endregion LIFECYCLE

  //#region METHODS
  updateTable(goBack: boolean = true) {
    // Actualizar los campos de la tabla
    this.tableService.edit<Table>(this.item, this._id, (res: Table) => {
      if (goBack) this.retrunToTables();
    });
  }

  save() {
    if (!this.buildTableObject()) return;

    this.disableButtons = true;
    this.updateTable(false);

    // Si no hay platos seleccionado, no hacer nada con la order
    if (this.recipes.length > 0) {
      if (!this.order) {
        // Registrar si no existe la orden nueva
        this.order = {
          recipes: this.recipes,
          table: this.item,
        };

        this.orderService.create<Order>(this.order, (res: Order) => {
          this.retrunToTables();
        });
      } else {
        // Si existe una orden editarla
        this.order.recipes = this.recipes;
        this.orderService.edit<Order>(
          this.order,
          this.order._id!,
          (res: Order) => {
            this.retrunToTables();
          }
        );
      }
    } else {
      this.retrunToTables();
    }
    this.disableButtons = false;
  }

  changeStatus(status: number, modal?: any) {
    // Si la orden va a ser completada, indicar el monto total y que debe ser cancelado
    if (status === 4) {
      this.modalService.open(modal, NGB_MODAL_OPTIONS).result.then(
        (res: any) => {
          if (res === 'completar') {
            this.changeStatusApiCall(status);
          }
        },
        (rej: any) => {}
      );
    } else {
      this.changeStatusApiCall(status);
    }
  }

  addRecipe(recipe: RecipePicked): void {
    this.recipes.push(recipe);
  }

  editRecipe(recipe: RecipePicked): void {
    const editedRecipe = this.recipes.find(
      (x) => x.recipe._id === recipe.recipe._id
    );
    if (!editedRecipe) return;
    this.recipes[this.recipes.indexOf(editedRecipe)] = recipe;
  }

  deleteRecipe(_id: string): void {
    const deletedRecipe = this.recipes.find((x) => x.recipe._id === _id);
    if (!deletedRecipe) return;
    this.recipes.splice(this.recipes.indexOf(deletedRecipe), 1);
  }

  private getTable() {
    this.tableService.getById<Table>(this._id, (res: Table) => {
      this.item = res;
      this.reserveHour = res.reserveHour ? res.reserveHour.split(':') : [];
    });
  }

  private getOrder() {
    this.orderService.getByTable<Order>(this._id, (res: Order) => {
      if (res) {
        this.order = res;
        this.recipes = this.order.recipes;
      }
    });
  }

  private getWaiters() {
    this.userService.getByRole<User>('Waiter', (res: User[]) => {
      this.waiters = res;
    });
  }

  private buildTableObject(): boolean {
    if (!this.item.waiter) {
      alert('Seleccionar el mesero.');
      return false;
    }
    if (this.item.availability === 2) {
      if (this.reserveHour[0] && this.reserveHour[1]) {
        this.item.reserveHour = this.reserveHour[0] + ':' + this.reserveHour[1];
        return true;
      } else {
        alert('Falta seleccionar la hora de reserva.');
        return false;
      }
    }

    return true;
  }

  private changeStatusApiCall(status: number) {
    this.order!.status = status;
    this.disableButtons = true;
    this.orderService.updateStatus<Order>(this.order!, (res: Order) => {
      this.disableButtons = false;
      if ([4, 5].includes(status)) this.router.navigate(['/clientAttention']);
    });
  }

  private retrunToTables() {
    this.disableButtons = false;
    this.router.navigate(['/clientAttention']);
  }
  //#endregion METHODS
}
