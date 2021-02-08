import { ROUTES } from '../../constants/routes.const';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { constructIsValid, constructIsInvalid, constructGetErrors } from '../../helper/form-validation-helper';
import { SignInRequest, SignInResponse } from 'src/app/models/sign-in';
import { SignInService } from 'src/app/services/sign-in.service';
import { Store } from '@ngrx/store';
import { go } from 'src/app/store/actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public routes = ROUTES;
  public signInForm: FormGroup;

  public isValid: (controlName: string) => boolean;
  public isInvalid: (controlName: string) => boolean;
  public getErrors: (controlName: string) => ValidationErrors;

  constructor(private formBuilder: FormBuilder, private signInService: SignInService, private store: Store<{}>) {
    this.signInForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
    });

    this.isValid = constructIsValid(this.signInForm);
    this.isInvalid = constructIsInvalid(this.signInForm);
    this.getErrors = constructGetErrors(this.signInForm);
  }

  ngOnInit(): void {}

  public goToHome(): void {
    this.store.dispatch(go({ path: ROUTES.Home }));
  }

  onSubmit(): void {
    if (!this.signInForm.valid) {
      return;
    }

    this.signInService.signUp(this.signInForm.getRawValue() as SignInRequest).subscribe(
      (data: SignInResponse) => {
        this.goToHome();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
