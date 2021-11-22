import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../constants/api.const';
import { IUser } from '../models/user';
import { SignInRequest, SignInResponse } from '../models/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

  signIn(signInData: SignInRequest): Observable<SignInResponse> {
    const url = `${API.Prefix}/${API.SignIn}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } };
    const body = JSON.stringify(signInData);

    return this.http.post(url, body, options).pipe(map((data) => data as SignInResponse));
  }

  getUser(token: string): Observable<IUser> {
    const url = `${API.Prefix}/${API.UserData}`;
    const options = { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` } };

    return this.http.post<IUser>(url, null, options);

  }
}
