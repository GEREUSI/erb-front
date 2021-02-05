import { ROUTES } from 'src/app/constants/routes.const';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  public routes = ROUTES;
  public signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
    });
   }

  ngOnInit(): void {

  }

  isValid(controlName: string): boolean {
    const control = this.signUpForm.controls[controlName];
    return !control.invalid && (control.dirty || control.touched);
  }

  isInvalid(controlName: string): boolean {
    const control = this.signUpForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  getErrors(controlName: string): ValidationErrors {
    return this.signUpForm.controls[controlName].errors ?? {};
  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      return;
    }

    alert(JSON.stringify(this.signUpForm.getRawValue()));
  }

}
