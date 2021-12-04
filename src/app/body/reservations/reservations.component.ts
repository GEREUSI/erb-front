import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { IRoomReservation, RoomReservationStatus } from 'src/app/shared/models/room';
import { RoomsService } from 'src/app/shared/services/rooms.service';
import { getAuthenticatedUserId, getAuthenticatedUserToken } from 'src/app/store/selectors';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
})
export class ReservationsComponent implements OnInit {
  public readonly roomReservationStatus = RoomReservationStatus
  public isLoading = false;
  public reservations: IRoomReservation[];
  private userId: number;
  private userToken: string;

  constructor(private roomsService: RoomsService, private store: Store) { }

  ngOnInit(): void {
    combineLatest([this.store.select(getAuthenticatedUserId), this.store.select(getAuthenticatedUserToken)]).subscribe(([id, token]) => {
      this.userId = id as number;
      this.userToken = token as string;
      this.loadData()
    })
    this.loadData()
  }

  exportAllReservations(): void {
    this.roomsService.exportUserReservations(this.userToken, this.userId)
  }

  getStatusName(status: RoomReservationStatus): string {
    return {
      [RoomReservationStatus.InProgress]: 'Nepatvirtinta',
      [RoomReservationStatus.Confirmed]: 'Patvirtinta',
      [RoomReservationStatus.Cancelled]: 'Atšaukta',
    }[status]
  }

  private loadData(): void {
    this.isLoading = true;
    this.roomsService.getUserReservations(this.userToken, this.userId)
      .subscribe((reservations) => {
        this.reservations = reservations
        this.isLoading = false
      })
  }
}

