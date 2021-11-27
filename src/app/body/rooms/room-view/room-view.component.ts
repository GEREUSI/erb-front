import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { IRoom, RoomType } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { getAuthenticatedUserId, getAuthenticatedUserToken, getIsAuthenticatedUser } from 'src/app/store/selectors';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent implements OnInit {
  public readonly roomType = RoomType
  public isLoading = false;
  public room: IRoom;
  public ratingFormControl = new FormControl(null, [Validators.required, Validators.max(5), Validators.min(1)])
  public isDisabled = (date: NgbDate, current?: { year: number, month: number}) => false;
  public minDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}
  public selectedDate:{ year: number; month: number; day: number; } | undefined;
  public defaultTimes: {hour: number; minutes: number}[] = [{hour:10, minutes:0}, {hour:11, minutes:0}, {hour:12, minutes:0}, {hour:13, minutes:0}, {hour:14, minutes:0}, {hour:15, minutes:0}, {hour:16, minutes:0}, {hour:17, minutes:0}, {hour:18, minutes:0}, {hour:19, minutes:0}, {hour:20, minutes:0}] 
  public selectedTime: {hour: number; minutes: number} | undefined;
  public isAuthenticatedUser$ = this.store.select(getIsAuthenticatedUser);
  public reservedDates: Date[]
  private userId: number;
  private userToken: string;

  constructor(private roomsService: RoomsService, private route: ActivatedRoute, private store: Store, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadData()
  }

  saveRating(): void {
    this.roomsService.rateRoom(this.userToken, this.room.id as number, { user_id: this.userId as number, rate: this.ratingFormControl.value}).subscribe(() => {
      this.snackBar.open('Kambarys ivertintas', 'OK', {
        duration: 3000
      });
      this.loadData()
    })
  }

  bookRoom(): void {
    const reservationDate = new Date(
      this.selectedDate?.year as number, this.selectedDate?.month  as number - 1 , this.selectedDate?.day, this.selectedTime?.hour, this.selectedTime?.minutes
      )
    const userTimezoneOffset = reservationDate.getTimezoneOffset() * 60000;
    const date = new Date(reservationDate.getTime() - userTimezoneOffset).toISOString().replace('Z', '').replace('T', ' ');
    date.substring(0, date.indexOf('.'))


    this.roomsService.bookRoom(this.userToken, this.room.id as number, {user_id: this.userId, reservation_date: date}).subscribe(() => {this.snackBar.open('Rezervacija sekminga', 'OK', {
      duration: 3000
    }); this.loadData()})
  }

  getTypeName(typeId: RoomType): string {
    return {
      [RoomType.Action]: 'Veiksmo',
      [RoomType.Scare]: 'Siaubo',
      [RoomType.Puzzle]: 'Galvosukių',
    }[typeId]
  }

  isSelected(time: {hour: number; minutes: number}): boolean {
    return time.hour === this.selectedTime?.hour && time.minutes === this.selectedTime?.minutes
  }

  isReserved(time: {hour: number; minutes: number}): boolean {
    return this.reservedDates.some((date) => this.selectedDate?.year === date.getFullYear() && this.selectedDate?.month - 1 === date.getMonth() && this.selectedDate?.day === date.getDate() && date.getHours() === time.hour && date.getMinutes() === time.minutes)
  }

  getFormattedRating(rateAvg: string): string {
    return parseInt(rateAvg) > 0? `${parseInt(rateAvg).toFixed(1)} įvertinimas` : 'Nėra įvertinimo'
  }

  getFormattedTime(time: {hour: number; minutes: number}): string {
    return time.minutes > 9? `${time.hour}:${time.minutes}` : `${time.hour}:0${time.minutes}`
  }

  selectTime(time: {hour: number; minutes: number}): void {
    if(!this.isReserved(time)){
      this.selectedTime = time
    }
  }

  private loadData(): void {
    this.selectedDate = undefined;
    this.selectedTime = undefined;
    this.isLoading = true;
    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken), this.route.params]).subscribe(([id, token, params]) => {
      this.userId = id as number;
      this.userToken = token as string;
      this.roomsService.getRoom(params.id).subscribe((rooms) => {
        this.room = rooms;
        this.isLoading = false;
        this.roomsService.getReservations(this.userToken, params.id).subscribe((reservations)=> {
          this.reservedDates = []
          reservations.forEach((r) => this.reservedDates.push(new Date(r.reservation_date)))
        })        
      })
    })
  }
}

