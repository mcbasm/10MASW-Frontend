import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/internal/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //#region DATA
  private optionsList: any[] = [
    { name: 'Atención al Cliente', route: 'clientAttention', auth: ['Waiter'] },
    { name: 'Compras', route: 'invoice', auth: ['Depot'] },
    { name: 'Movimientos', route: 'movement', auth: ['Depot'] },
    { name: 'Órdenes', route: 'order', auth: ['Kitchen', 'Waiter'] },
    { name: 'Platos', route: 'recipe', auth: ['Kitchen', 'Waiter'] },
    { name: 'Productos', route: 'product', auth: ['Depot'] },
    { name: 'Usuarios', route: 'users', auth: [] },
  ];

  showOptions: any[] = [];
  //#endregion DATA

  constructor(private auth: AuthenticationService, private router: Router) {}

  //#region LIFECYCLE
  ngOnInit(): void {
    this.showOptions = this.optionsList.filter(
      (x) =>
        this.auth.getRole() === 'Administrator' ||
        x.auth.includes(this.auth.getRole())
    );
  }
  //#endregion LIFECYCLE

  //#region METHODS
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  //#endregion METHODS
}
