import { RegisterRecipeComponent } from './pages/recipe/register-recipe/register-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
//#region IMPORTS
import { RegisterInvoiceComponent } from './pages/invoice/register-invoice/register-invoice.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { RegisterProductComponent } from './pages/product/register-product/register-product.component';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterUserComponent } from './pages/user/register-user/register-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/internal/auth-guard.service';
//#endregion IMPORTS

//#region ROUTING
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'invoice',
    children: [
      {
        path: '',
        component: InvoiceComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register',
        component: RegisterInvoiceComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'recipe',
    children: [
      {
        path: '',
        component: RecipeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register',
        component: RegisterRecipeComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        component: RegisterRecipeComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ProductComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'register',
        component: RegisterProductComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        component: RegisterProductComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
  {
    path: 'users',
    children: [
      { path: '', component: UserComponent, canActivate: [AuthGuardService] },
      {
        path: 'register',
        component: RegisterUserComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'edit/:id',
        component: RegisterUserComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
//#endregion ROUTING

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
