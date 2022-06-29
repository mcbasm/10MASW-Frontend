import { Router } from '@angular/router';
import { User, Pagination, PaginationResult } from './../../types/types';
import { UserService } from './../../services/external/user.service';
import { Component, OnInit } from '@angular/core';

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
  };
  //#endregion VARIABLES

  constructor(private userService: UserService, private router: Router) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.list();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list() {
    this.userService.getPaginated<User>(
      this.pagination,
      (res: PaginationResult<User>) => {
        this.items = res.items;
        this.pagination = res.pagination;
      }
    );
  }

  changePage(page: number) {
    this.pagination.page = page;
    this.list();
  }

  edit(_id: string) {
    this.router.navigate(['users/edit', _id]);
  }

  delete(_id: string) {
    if (confirm('¿Esta seguro?'))
      this.userService.delete<User>(_id, (res: User) => {
        this.list();
      });
  }
  //#endregion METHODS
}
