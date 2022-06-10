import { Router } from '@angular/router';
import { User, Pagination } from './../../types/types';
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
    rows: 10,
    total: 0,
    pages: 0,
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
    this.userService.getAll<User>((res: User[]) => {
      this.items = res;
    });
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
