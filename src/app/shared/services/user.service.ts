import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api.const';
import { Observable } from 'rxjs';
import { IUserData, IUserSettings } from '../models/settings';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserSettings(userId: number, token: string): Observable<IUserSettings> {
    const url = `${API.Prefix}/${API.Settings}/${userId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.get<IUserSettings>(url, options);
  }

  updateUserSettings(userData: IUserData, userId: number, token: string): Observable<IUserSettings> {
    const url = `${API.Prefix}/${API.Settings}/${userId}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };
    const body = JSON.stringify(userData);

    return this.http.patch<IUserSettings>(url, body, options);
  }

  getUserData(token: string): Observable<IUser> {
    const url = `${API.Prefix}/${API.UserData}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.post<IUser>(url, null, options);
  }
}
