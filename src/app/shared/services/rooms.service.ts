import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api.const';
import { Observable } from 'rxjs';
import { IRoom, IRoomSearchParams } from '../models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  createRoom(userData: IRoom, userId: number, token: string): Observable<IRoom> {
    const url = `${API.Prefix}/user/${userId}/rooms`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };
    const body = JSON.stringify(userData);

    return this.http.post<IRoom>(url, body, options);
  }

  getRoom(roomId: string, userId: number, token: string): Observable<IRoom> {
    const url = `${API.Prefix}/user/${userId}/rooms/${roomId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<IRoom>(url, options);
  }

  getUserRooms(userId: number, token: string): Observable<IRoom[]> {
    const url = `${API.Prefix}/user/${userId}/rooms`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<IRoom[]>(url, options);
  }

  getRooms(token: string, params: IRoomSearchParams): Observable<IRoom[]> {
    const url = `${API.Prefix}/rooms`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` }, params: params as unknown as HttpParams };

    return this.http.get<IRoom[]>(url, options);
  }
}
