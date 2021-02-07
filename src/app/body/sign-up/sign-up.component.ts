import { ROUTES } from '../../constants/routes.const';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { constructIsValid, constructIsInvalid, constructGetErrors } from '../../helper/form-validation-helper';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  public routes = ROUTES;
  public signUpForm: FormGroup;

  public isValid: (controlName: string) => boolean;
  public isInvalid: (controlName: string) => boolean;
  public getErrors: (controlName: string) => ValidationErrors;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.isValid = constructIsValid(this.signUpForm);
    this.isInvalid = constructIsInvalid(this.signUpForm);
    this.getErrors = constructGetErrors(this.signUpForm);

   }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      return;
    }

    alert(JSON.stringify(this.signUpForm.getRawValue()));
  }
}
