import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { API } from '../constants/api.const';
import { IUser } from '../models/iuser';
import { SignInResponse } from '../models/sign-in';

import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignInService],
    });

    service = TestBed.inject(SignInService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should make post call', () => {
      const expectedResponse: SignInResponse = {
        user: {} as IUser,
        token: '',
      };
      let signInResponse: SignInResponse = {} as SignInResponse;
      service
        .signIn({ email: '', password: '' })
        .pipe(take(1))
        .subscribe((response) => {
          signInResponse = response;
        });
      const req = httpMock.expectOne(`${API.Prefix}/${API.SignIn}`).flush(expectedResponse);
      expect(signInResponse).toEqual(expectedResponse);
    });
  });
});
