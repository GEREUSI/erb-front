import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API } from '../constants/api.const';
import { SignInRequest, SignInResponse } from '../models/sign-in';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

  signUp(signUpData: SignInRequest): Observable<SignInResponse> {
    const url = `${API.Prefix}/${API.SignIn}`;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify(signUpData);

    return this.http.post(url, body, options).pipe(map((data) => data as SignInResponse));
  }
}
