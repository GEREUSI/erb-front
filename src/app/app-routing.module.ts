import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body';
import { ROUTES } from './constants/routes.const';

const routes: Routes = [
  {path: ROUTES.SignIn, component: HomeComponent}, // add proper component once developed
  {path: ROUTES.SignUp, component: HomeComponent}, // add proper component once developed
  {path: ROUTES.Home, component: HomeComponent},
  {path: '', redirectTo: ROUTES.HomeRedirect, pathMatch: 'full'},
  {path: '**', redirectTo: ROUTES.HomeRedirect} // create 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
