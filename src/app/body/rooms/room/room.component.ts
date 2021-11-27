import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ROUTES } from 'src/app/shared/constants/routes.const';
import { IRoom } from 'src/app/shared/models/room';
import { go } from 'src/app/store/actions';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  @Input() room: IRoom

  constructor(private store: Store){}

  getFormattedRating(rateAvg: string): string {
    return parseInt(rateAvg) > 0? `${parseInt(rateAvg).toFixed(1)} įvertinimas` : 'Nėra įvertinimo'
  }

  goToRoom(roomId: number | undefined): void {
    this.store.dispatch(go({path: `rooms/${roomId}` as ROUTES}))
  }
}

