import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from './pages/user/user.component';
import { RegisterUserComponent } from './pages/user/register-user/register-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterProductComponent } from './pages/product/register-product/register-product.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { StatusPickerComponent } from './components/status-picker/status-picker.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { RegisterInvoiceComponent } from './pages/invoice/register-invoice/register-invoice.component';
import { InstanceofdatePipe } from './pipes/instanceofdate.pipe';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { ProductPickerComponent } from './components/product-picker/product-picker.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { DetailInvoiceComponent } from './pages/invoice/detail-invoice/detail-invoice.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterUserComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    ErrorAlertComponent,
    PaginationComponent,
    LoginComponent,
    ProductComponent,
    RegisterProductComponent,
    StatusBadgeComponent,
    StatusPickerComponent,
    InvoiceComponent,
    RegisterInvoiceComponent,
    InstanceofdatePipe,
    DatepickerComponent,
    ProductPickerComponent,
    ProductSearchComponent,
    DetailInvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
