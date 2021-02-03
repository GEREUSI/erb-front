import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body';
import { SignupComponent } from './body/signup/signup.component';
import { ROUTES } from './constants/routes.const'

const routes: Routes = [
    {path: ROUTES.SignUp, component: SignupComponent},
    {path: ROUTES.Home, component: HomeComponent},
    {path: '', redirectTo: ROUTES.HomeRedirect, pathMatch: 'full'},
    {path: '**', redirectTo: ROUTES.HomeRedirect},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
