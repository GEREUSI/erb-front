import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpRequest, SignUpResponse } from '../models/sign-up';
import { API } from '../constants/api.const';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signUp(signUpData: SignUpRequest): Observable<SignUpResponse> {
    const url = `${API.Prefix}/${API.SignUp}`;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const body = JSON.stringify(signUpData);

    return this.http.post(url, body, options).pipe(map((data) => data as SignUpResponse));
  }
}
