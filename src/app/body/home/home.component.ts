import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { IRoom, IRoomSearchParams, RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { getAuthenticatedUserToken } from 'src/app/store/selectors';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public rooms: IRoom[];
  public isLoading = true;
  public searchForm = this.createSearchForm()
  private userToken: string;

  constructor(private roomsService: RoomsService, private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData()
  }

  public openSearchParamsModal(): void {
    const dialogRef = this.dialog.open(SearchDialogComponent, {
      disableClose: true,
      data: {form: this.searchForm},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadData()
      }
    });
  }

  private loadData(): void {
    this.store.select(getAuthenticatedUserToken).subscribe((token) => {
      this.userToken = token as string;
      const params = this.getSearchParams();
      this.roomsService.getRooms(this.userToken, params).subscribe(
        (rooms) => {
          this.isLoading = false;
          this.rooms = rooms;
        },
        () => {
          this.isLoading = false;
        })
    })
  }

  public isRoomValid(room: IRoom): boolean {
    const roomRating:number = parseInt(room.avgRate)
    const searchParams = this.searchForm.getRawValue()

    return roomRating === 0 || roomRating >= searchParams.ratingFrom && roomRating <= searchParams.ratingTo
  }

  private createSearchForm(): FormGroup {
    let form = new FormGroup({
      ratingFrom: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('\d+')]),
      ratingTo: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('\d+')])
    })
    Object.values(RoomType).forEach((roomType) => {
      form.addControl(roomType, new FormControl(true, []))
    });

    return form
  }

  private getSearchParams(): IRoomSearchParams {
    let roomTypes: string[] = []
    Object.values(RoomType).forEach((roomType) => {
      if(this.searchForm.get(roomType)?.value){
        roomTypes = [...roomTypes, roomType]
      }
    })

    return { roomType: roomTypes }
  }
}
