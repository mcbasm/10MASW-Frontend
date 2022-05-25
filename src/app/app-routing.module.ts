//#region IMPORTS
import { RegistryUserComponent } from './pages/registry-user/registry-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//#endregion IMPORTS

//#region ROUTING
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'users',
    children: [
      { path: '', component: UserComponent },
      { path: 'registry', component: RegistryUserComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
//#endregion ROUTING

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
