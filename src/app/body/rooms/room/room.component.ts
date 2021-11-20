import { Component, Input } from '@angular/core';
import { IRoom } from 'src/app/shared/models/room';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  @Input() room: IRoom
}

