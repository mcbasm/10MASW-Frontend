import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './pages/user/user.component';
import { RegistryUserComponent } from './pages/registry-user/registry-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import * as bootstrap from 'bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistryUserComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
