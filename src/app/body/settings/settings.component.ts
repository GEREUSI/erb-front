import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserData } from 'src/app/shared/models/settings';
import { UserType } from 'src/app/shared/models/user';
import { UserService } from 'src/app/shared/services/user.service';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public readonly userType = UserType
  public isInitialLoading = false;
  public isUpdating = false;
  public personalDataForm: FormGroup;
  private userId: number;
  private userToken: string;
  private userData: IUserData;

  constructor(private formBuilder: FormBuilder, private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    this.isInitialLoading = true;

    this.personalDataForm = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        email: [null, [Validators.required, Validators.email]],
        firstName: [null],
        lastName: [null],
        birthdayDate: [null],
        typeId: [null],
      },
      { updateOn: 'blur' }
    );

    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken)]).subscribe(([id, token]) => {
      this.userId = id as number;
      this.userToken = token as string;
      this.userService.getUserSettings(this.userId, this.userToken).subscribe((data) => {
        this.userData = data.user;
        this.personalDataForm.patchValue(data.user)
        this.isInitialLoading = false;
      }, () => {
        this.isInitialLoading = false;
      })
    })



    this.store.select(getAuthenticatedUserId).pipe(take(1)).subscribe(
      (id)=> {
        
      }
    )
  }

  public onCancel(): void {
    this.personalDataForm.patchValue(this.userData)
  }

  public onSubmit(): void {
    if (this.personalDataForm.valid) {
      this.isUpdating = true;
      this.userService.updateUserSettings(this.personalDataForm.getRawValue(), this.userId, this.userToken).subscribe(() => {
        this.isUpdating = false;
      },
      () => {
        this.isUpdating = false;
      }
      );
    }
  }
}

