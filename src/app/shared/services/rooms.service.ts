import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api.const';
import { Observable } from 'rxjs';
import { IRoom, IRoomRateParams, IRoomReservation, IRoomReserveParams, IRoomResponse, IRoomSearchParams, ISingleRoomResponse, RoomReservationStatus } from '../models/room';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  createRoom(roomData: IRoom, userId: number, token: string): Observable<IRoom> {
    const url = `${API.Prefix}/user/${userId}/rooms`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };
    const body = JSON.stringify(roomData);

    return this.http.post<ISingleRoomResponse>(url, body, options).pipe(map((roomResponse)=> roomResponse.room) );;
  }

  updateRoom(roomData: IRoom, userId: number, token: string): Observable<void> {
    const url = `${API.Prefix}/user/${userId}/rooms/${roomData.id}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };
    const body = JSON.stringify(roomData);

    return this.http.patch<void>(url, body, options);
  }

  getUserRoom(roomId: string, userId: number, token: string): Observable<IRoom> {
    const url = `${API.Prefix}/user/${userId}/rooms/${roomId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<ISingleRoomResponse>(url, options).pipe(map((roomResponse)=> roomResponse.room) );
  }

  getUserRooms(userId: number, token: string): Observable<IRoom[]> {
    const url = `${API.Prefix}/user/${userId}/rooms`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<IRoomResponse>(url, options).pipe(map((rooms)=> rooms.rooms) );
  }

  getRooms(token: string, params: IRoomSearchParams): Observable<IRoom[]> {
    const url = `${API.Prefix}/rooms`;
    const searchParams = { roomType: params.roomType.join(',')}
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }, params: searchParams as unknown as HttpParams };
    
    return this.http.get<IRoomResponse>(url, options).pipe(map((rooms)=> rooms.rooms) );;
  }

  getRoom(roomId: number): Observable<IRoom> {
    const url = `${API.Prefix}/room/${roomId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json'} };

    return this.http.get<IRoom>(url, options);
  }

  rateRoom(token: string, roomId: number, body: IRoomRateParams): Observable<void> {
    const url = `${API.Prefix}/room/${roomId}/rate`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }};
    
    return this.http.post<void>(url, body, options);
  }

  bookRoom(token: string, roomId: number, body: IRoomReserveParams): Observable<void> {
    const url = `${API.Prefix}/room/${roomId}/reserve`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }};
    
    return this.http.post<void>(url, body, options);
  }

  getUserRoomReservations(roomId: string, token: string): Observable<IRoomReservation[]> {
    const url = `${API.Prefix}/room/${roomId}/reservations`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }};

    return this.http.get<IRoomReservation[]>(url, options);
  }

  getReservations(token: string, roomId: string): Observable<IRoomReservation[]> {
    const url = `${API.Prefix}/room/${roomId}/booked`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<IRoomReservation[]>(url, options);
  }

  updateReservationStatus(token: string, reservationId: number, status: RoomReservationStatus): Observable<void> {
    const url = `${API.Prefix}/user/reservations/${reservationId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }};
    
    return this.http.post<void>(url, {status}, options);
  }
}
