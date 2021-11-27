import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { ROUTES } from 'src/app/shared/constants/routes.const';
import { IRoom, RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { go } from 'src/app/store/actions';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors';

@Component({
  selector: 'app-user-rooms',
  templateUrl: './user-rooms.component.html',
  styleUrls: ['./user-rooms.component.scss'],
})
export class UserRoomsComponent implements OnInit {
  public rooms: IRoom[];
  public isLoading = true;
  private userId: number;
  private userToken: string;

  constructor(private roomsService: RoomsService, private store: Store) {}

  ngOnInit(): void {
    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken)]).subscribe(([id, token]) => {
      this.userId = id as number;
      this.userToken = token as string;
      this.roomsService.getUserRooms(this.userId, this.userToken).subscribe(
        (rooms) => {
          this.isLoading = false;
          this.rooms = rooms;
        },
        () => {
          this.isLoading = false;
        })
    })
  }

  public onCreateClick(): void {
    this.store.dispatch(go({path: ROUTES.RoomCreate}))
  }

  public onRoomSelect(id?: number): void {
    this.store.dispatch(go({path: ROUTES.RoomEditRedirect, id}))
  }
}

