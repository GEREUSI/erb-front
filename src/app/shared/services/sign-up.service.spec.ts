import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { SignUpService } from './sign-up.service';
import { API } from '../constants/api.const';
import { SignUpResponse } from '../models/sign-up';
import { IUser } from '../models/user';
import { take } from 'rxjs/operators';

describe('SignUpServiceService', () => {
  let service: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService],
    });

    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp', () => {
    it('should make post call', () => {
      const expectedResponse: SignUpResponse = {
        user: {} as IUser,
        token: '',
      };
      let signUpResponse: SignUpResponse = {} as SignUpResponse;
      service
        .signUp({ username: '', email: '', password: '' })
        .pipe(take(1))
        .subscribe((response) => {
          signUpResponse = response;
        });
      const req = httpMock.expectOne(`${API.Prefix}/${API.SignUp}`).flush(expectedResponse);
      expect(signUpResponse).toEqual(expectedResponse);
    });

    it('should not make api calls', () => {
      const expectedResponse: SignUpResponse = {
        user: {} as IUser,
        token: '',
      };
      let signUpResponse: SignUpResponse = {} as SignUpResponse;
      service
        .signUp({ username: '', email: '', password: '' })
        .pipe(take(1))
        .subscribe((response) => {
          signUpResponse = response;
        });
      httpMock.expectNone(`${API.Prefix}/${API.SignIn}`);
    });

    it('should return an error', () => {
      let signUpResponse: HttpErrorResponse = {} as HttpErrorResponse;
      service
        .signUp({ username: '', email: '', password: '' })
        .pipe(take(1))
        .subscribe(
          (response) => {},
          (error) => {
            signUpResponse = error;
          }
        );
      const url = `${API.Prefix}/${API.SignUp}`;
      httpMock.expectOne(url).error({} as ErrorEvent);
      expect(signUpResponse.url).toEqual(url);
    });
  });
});
