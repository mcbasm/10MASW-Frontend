import { LoginComponent } from './pages/login/login.component';
//#region IMPORTS
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
  { path: 'login', component: LoginComponent },
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
