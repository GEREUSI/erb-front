import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROUTES } from '../shared/constants/routes.const';
import { go } from '../store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
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
}
