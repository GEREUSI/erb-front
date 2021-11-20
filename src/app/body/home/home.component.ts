import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { IRoom, IRoomSearchParams, RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors';
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
  private userId: number;
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
        this.searchForm = result
        this.loadData()
      }
    });
  }

  private loadData(): void {
    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken)]).subscribe(([id, token]) => {
      this.userId = id as number;
      this.userToken = token as string;
      const params = this.getSearchParams();
      this.roomsService.getRooms(this.userToken, params).subscribe(
        (rooms) => {
          this.isLoading = false;
          this.rooms = rooms;
        },
        () => {
          this.isLoading = false;
          this.rooms = [{
            id: 1,
            title: 'Pabėgimo kambario ne pavadinimas',
            address: 'Vilnius, adreso g. 25',
            size: '2-3 žmonėms',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price: 100,
            typeId: RoomType.Action,}, {
              id: 2,
              title: 'Pabėgimo kambario pavadinimas',
              address: 'Vilnius, P. adreso g. 105',
              size: '2-5 žmonėms',
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              price: 100,
              typeId: RoomType.Action,}]
        })
    })
  }

  private createSearchForm(): FormGroup {
    let form = new FormGroup({})
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
