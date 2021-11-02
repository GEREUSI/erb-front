import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body';
import { SettingsComponent } from './body/settings/settings.component';
import { SignInComponent } from './body/sign-in/sign-in.component';
import { SignUpComponent } from './body/sign-up/sign-up.component';
import { ROUTES } from './shared/constants/routes.const';
import { AuthGuard } from './shared/guards/authenticated-user.guard';
import { UnauthenticatedGuard } from './shared/guards/unauthenticated-user.guard';

const routes: Routes = [
  { path: ROUTES.SignIn, component: SignInComponent, canActivate: [UnauthenticatedGuard] },
  { path: ROUTES.SignUp, component: SignUpComponent, canActivate: [UnauthenticatedGuard] },
  { path: ROUTES.Settings, component: SettingsComponent, canActivate: [AuthGuard] },
  { path: ROUTES.Home, component: HomeComponent },
  { path: '', redirectTo: ROUTES.HomeRedirect, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.HomeRedirect },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
