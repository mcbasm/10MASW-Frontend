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

  constructor(private userService: UserService) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.list();
  }
  //#endregion LIFECYCLE

  //#region METHODS
  list() {
    this.userService.getAll((res: User[]) => {
      this.items = res;
    });
  }
  //#endregion METHODS
}
