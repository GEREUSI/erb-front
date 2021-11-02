import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { IUserData } from 'src/app/shared/models/settings';
import { UserType } from 'src/app/shared/models/user';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { getAuthenticatedUserId } from '../../store/selectors';

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
  private userId?: string;
  private userData: IUserData;

  constructor(private formBuilder: FormBuilder, private store: Store, private settingsService: SettingsService) {}

  ngOnInit(): void {
    this.isInitialLoading = true;

    this.personalDataForm = this.formBuilder.group(
      {
        username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
        email: [null, [Validators.required, Validators.email]],
        firstName: [null],
        lastName: [null],
        birthday: [null],
        type: [null],
      },
      { updateOn: 'blur' }
    );

    this.store.select(getAuthenticatedUserId).pipe(take(1)).subscribe(
      (id)=> {
        this.userId = id;
        this.settingsService.getUserData(id as string).subscribe((data) => {
          this.userData = data;
          this.personalDataForm.patchValue(data)
          this.isInitialLoading = false;
        }, () => {
          this.isInitialLoading = false;
        })
      }
    )
  }

  public onCancel(): void {
    this.personalDataForm.patchValue(this.userData)
  }

  public onSubmit(): void {
    if (this.personalDataForm.valid) {
      this.isUpdating = true;
      this.settingsService.updateUserData({...this.personalDataForm.getRawValue(), _id: this.userId}).subscribe(() => {
        this.isUpdating = false;
      },
      () => {
        this.isUpdating = false;
      }
      );
    }
  }
}
