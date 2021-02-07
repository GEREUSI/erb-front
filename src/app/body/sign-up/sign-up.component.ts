import { ROUTES } from '../../constants/routes.const';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { SignUpService } from 'src/app/services/sign-up.service';
import { SignUpRequest, SignUpResponse } from 'src/app/models/sign-up';
import { Store } from '@ngrx/store';
import { go } from 'src/app/store/actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public routes = ROUTES;
  public signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private signUpService: SignUpService, private store: Store<{}>) {
    this.signUpForm = formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]],
    }, {updateOn: 'blur'});
   }

  ngOnInit(): void { }

  public goToHome(): void {
    this.store.dispatch(go({ path: ROUTES.Home }));
  }

  onSubmit(): void {
    if (!this.signUpForm.valid) {
      return;
    }

    this.signUpService.signUp(this.signUpForm.getRawValue() as SignUpRequest).subscribe(
      (data: SignUpResponse) => {
        this.goToHome();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
