import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body';
import { SignInComponent } from './body/sign-in/sign-in.component';
import { SignUpComponent } from './body/sign-up/sign-up.component';
import { ROUTES } from './constants/routes.const';

const routes: Routes = [
  {path: ROUTES.SignIn, component: SignInComponent},
  {path: ROUTES.SignUp, component: SignUpComponent},
  {path: ROUTES.Home, component: HomeComponent},
  {path: '', redirectTo: ROUTES.HomeRedirect, pathMatch: 'full'},
  {path: '**', redirectTo: ROUTES.HomeRedirect} // create 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
