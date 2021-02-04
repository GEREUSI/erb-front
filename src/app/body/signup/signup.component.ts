import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUp } from 'src/app/models/signup'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signUpForm : FormGroup = new FormGroup({});

  signUp: SignUp = {
    username: '',
    password: '',
    email: '',
  };

  hasErrors(controlName: string) : boolean {
    let control = this.signUpForm.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  getErrors(controlName: string) {
    return this.signUpForm.controls[controlName].errors ?? {};
  }

  constructor() { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl(this.signUp.username, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]),
      password: new FormControl(this.signUp.password, [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
      email: new FormControl(this.signUp.email, [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    if(!this.signUpForm.valid)
      return;
      
    alert(JSON.stringify(this.signUpForm.getRawValue()))
  }

}
