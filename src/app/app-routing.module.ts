import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body';
import { RoomEditComponent } from './body/rooms/room-edit/room-edit.component';
import { RoomCreateComponent } from './body/rooms/room-create/room-create.component';
import { SettingsComponent } from './body/settings/settings.component';
import { SignInComponent } from './body/sign-in/sign-in.component';
import { SignUpComponent } from './body/sign-up/sign-up.component';
import { ROUTES } from './shared/constants/routes.const';
import { AuthGuard } from './shared/guards/authenticated-user.guard';
import { UnauthenticatedGuard } from './shared/guards/unauthenticated-user.guard';
import { UserRoomsComponent } from './body/rooms/user-rooms/user-rooms.component';
import { RoomViewComponent } from './body/rooms/room-view/room-view.component';

const routes: Routes = [
  { path: ROUTES.SignIn, component: SignInComponent, canActivate: [UnauthenticatedGuard] },
  { path: ROUTES.SignUp, component: SignUpComponent, canActivate: [UnauthenticatedGuard] },
  { path: ROUTES.Settings, component: SettingsComponent, canActivate: [AuthGuard] },
  { path: ROUTES.Home, component: HomeComponent },
  { path: ROUTES.RoomCreate, component: RoomCreateComponent, canActivate: [AuthGuard] },
  { path: ROUTES.RoomEdit, component: RoomEditComponent, canActivate: [AuthGuard] },
  { path: ROUTES.UserRooms, component: UserRoomsComponent, canActivate: [AuthGuard] },
  { path: ROUTES.RoomView, component: RoomViewComponent},
  { path: '', redirectTo: ROUTES.HomeRedirect, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.HomeRedirect },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
