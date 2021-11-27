import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { ROUTES } from 'src/app/shared/constants/routes.const';
import { IRoomReservation, RoomReservationStatus, RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { go } from 'src/app/store/actions';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
})
export class RoomEditComponent implements OnInit {
  public readonly roomType = RoomType
  public readonly roomReservationStatus = RoomReservationStatus
  public isUpdating = false;
  public roomForm: FormGroup;
  public roomReservations: IRoomReservation[]
  private userId: number;
  private userToken: string;
  private roomId: string;

  constructor(private formBuilder: FormBuilder, private roomsService: RoomsService, private route: ActivatedRoute, private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group(
      {
        id: [null, [Validators.required]],
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
      this.roomId = params.id
      this.loadData()
    })
  }

  updateReservation(reservationId: number, status: RoomReservationStatus) : void {
    this.roomsService.updateReservationStatus(this.userToken, reservationId, status).subscribe(() => {
      this.loadData()
    })
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      this.isUpdating = true;
      this.roomsService.updateRoom(this.roomForm.getRawValue(), this.userId, this.userToken).subscribe(() => {
        this.isUpdating = false;
        this.store.dispatch(go({ path: ROUTES.Home }))
        this.snackBar.open('Kambarys atnaujintas', 'OK', {
          duration: 3000
        });
      },
        (error) => {
          this.isUpdating = false;
          this.snackBar.open(error.message, 'OK', {
            duration: 3000
          });
        }
      );
    }
  }

  private loadData(): void {
    this.roomsService.getUserRoom(this.roomId, this.userId, this.userToken).subscribe((room) => this.roomForm.patchValue(room))
    this.roomsService.getUserRoomReservations(this.roomId, this.userToken).subscribe((roomReservations) => this.roomReservations = roomReservations)
  }
}

