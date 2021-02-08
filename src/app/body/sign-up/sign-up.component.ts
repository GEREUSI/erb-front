import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ROUTES } from '../../constants/routes.const';
import { SignUpRequest } from '../../models/sign-up';
import { go, signUp } from '../../store/actions';
import { getIsSignUpLoading, getSignUpErrors, getSignUpHasErrors } from '../../store/selectors';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public isLoading$: Observable<boolean>;
  public hasErrors$: Observable<boolean>;
  public errors$: Observable<string>;
  public routes = ROUTES;
  public signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<{}>) {
    this.isLoading$ = this.store.select(getIsSignUpLoading);
    this.hasErrors$ = this.store.select(getSignUpHasErrors);
    this.errors$ = this.store.select(getSignUpErrors);

    this.signUpForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
    }, {updateOn: 'blur'});
   }

  public goToHome(): void {
    this.store.dispatch(go({ path: ROUTES.Home }));
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.store.dispatch(signUp({payload: this.signUpForm.getRawValue() as SignUpRequest}));
    }
  }
}
