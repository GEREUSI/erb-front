import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api.const';
import { Observable } from 'rxjs';
import { IUserData } from '../models/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  getUserData(id: string): Observable<IUserData> {
    const url = `${API.Prefix}/${API.Settings}/${id}`;

    return this.http.get<IUserData>(url);
  }

  updateUserData(userData: IUserData): Observable<IUserData> {
    const url = `${API.Prefix}/${API.Settings}`;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify(userData);

    return this.http.patch<IUserData>(url, body, options);
  }
}
