import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {
  public readonly roomType = RoomType
  public isUpdating = false;
  public roomForm: FormGroup;
  private userId: number;
  private userToken: string;

  constructor(private formBuilder: FormBuilder, private roomsService: RoomsService, private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group(
      {
        title: [null, [Validators.required]],
        address: [null, [Validators.required]],
        size: [null, [Validators.required]],
        description: [null, [Validators.required]],
        price: [null, [Validators.required]],
        typeId: [null, [Validators.required]]
      },
      { updateOn: 'blur' }
    );

    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken), this.route.params]).subscribe(([id, token, params]) => {
      this.userId = id as number;
      this.userToken = token as string;
      this.roomsService.getRoom(params.id, this.userId, this.userToken).subscribe((room) => this.roomForm.patchValue(room))
    })
  }

  public onSubmit(): void {
    if (this.roomForm.valid) {
      this.isUpdating = true;
      this.roomsService.createRoom(this.roomForm.getRawValue(), this.userId, this.userToken).subscribe(() => {
        this.isUpdating = false;
      },
      () => {
        this.isUpdating = false;
      }
      );
    }
  }
}

