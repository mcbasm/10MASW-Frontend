import { NGB_MODAL_OPTIONS } from './../../variables/GlobalVariables';
import { RoleService } from './../../services/external/role.service';
import { Router } from '@angular/router';
import { User, Pagination, PaginationResult, Role } from './../../types/types';
import { UserService } from './../../services/external/user.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { buildFilter } from 'src/app/functions/FilterFunctions';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  //#region VARIABLES
  items: User[] = [];
  pagination: Pagination = {
    limit: 10,
    page: 1,
    totalItems: 0,
    totalPages: 1,
    filter: {},
  };
  roles: Role[] = [];
  filter: any;
  //#endregion VARIABLES

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.getRoles();
    this.reload();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list(): void {
    this.pagination.filter = buildFilter(this.filter);
    this.userService.getPaginated<User>(
      this.pagination,
      (res: PaginationResult<User>) => {
        this.items = res.items;
        this.pagination = res.pagination;
        // Seleccionar los contenidos a mostrar
        const selectedRole = this.roles.find(
          (x) => x._id === res.pagination.filter.role.value
        );
        this.filter.role.content = selectedRole?.nameES;
      }
    );
  }

  changePage(page: number): void {
    this.pagination.page = page;
    this.list();
  }

  edit(_id: string): void {
    this.router.navigate(['users/edit', _id]);
  }

  delete(_id: string): void {
    if (confirm('¿Esta seguro?'))
      this.userService.delete<User>(_id, (res: User) => {
        this.list();
      });
  }

  reload(): void {
    this.getRoles();
    this.initializeFilter();
    this.list();
  }

  showFilter(modal: any): void {
    this.modalService.open(modal, NGB_MODAL_OPTIONS).result.then(
      (res: any) => {
        if (res === 'filter') {
          this.list();
        }
      },
      (rej: any) => {}
    );
  }

  private getRoles(): void {
    this.roleService.getAll<Role>((res: Role[]) => {
      this.roles = res;
    });
  }

  private initializeFilter(): void {
    this.filter = {
      name: { label: 'Nombre' },
      lastName: { label: 'Apellidos' },
      email: { label: 'Email' },
      phone: { label: 'Teléfono' },
      role: { label: 'Rol', isId: true },
      status: { label: 'Estado', value: true },
    };
  }
  //#endregion METHODS
}
