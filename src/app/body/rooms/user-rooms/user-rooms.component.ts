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
          this.rooms = [{
            id: 1,
            title: 'Title',
            address: 'Address',
            size: 'size',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 100,
            typeId: RoomType.Action,}, {
              id: 2,
              title: 'Title',
              address: 'Address',
              size: 'size',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              price: 100,
              typeId: RoomType.Action,}]
        })
    })
  }

  public onCreateClick(): void {
    this.store.dispatch(go({path: ROUTES.RoomCreate}))
  }

  public onRoomSelect(id?: number): void {
    console.log(id)
    this.store.dispatch(go({path: ROUTES.RoomEditRedirect, id}))
  }
}

