import { ROUTES } from '../../constants/routes.const';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SignInRequest } from '../../models/sign-in';
import { go, signIn } from '../../store/actions';
import { getIsSignInLoading, getSignInErrors, getSignInHasErrors } from '../../store/selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public isLoading$: Observable<boolean>;
  public hasErrors$: Observable<boolean>;
  public errors$: Observable<string>;
  public routes = ROUTES;
  public signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<{}>) {
    this.isLoading$ = this.store.select(getIsSignInLoading);
    this.hasErrors$ = this.store.select(getSignInHasErrors);
    this.errors$ = this.store.select(getSignInErrors);

    this.signInForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    }, {updateOn: 'blur'});
   }

  public goToHome(): void {
    this.store.dispatch(go({ path: ROUTES.Home }));
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.store.dispatch(signIn({payload: this.signInForm.getRawValue() as SignInRequest}));
    }
  }
}
