import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROUTES } from '../shared/constants/routes.const';
import { go, logOut } from '../store/actions';
import { getIsAuthenticatedUser } from '../store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public isAuthenticatedUser$ = this.store.select(getIsAuthenticatedUser);

  constructor(private store: Store<{}>) {}

  public goToHome(): void {
    this.store.dispatch(go({ path: ROUTES.Home }));
  }

  public goToSignIn(): void {
    this.store.dispatch(go({ path: ROUTES.SignIn }));
  }

  public goToSignUp(): void {
    this.store.dispatch(go({ path: ROUTES.SignUp }));
  }

  public goToSettings(): void {
    this.store.dispatch(go({ path: ROUTES.Settings}))
  }

  public logOut(): void {
    this.store.dispatch(logOut());
    this.store.dispatch(go({ path: ROUTES.Home }));
  }
}
