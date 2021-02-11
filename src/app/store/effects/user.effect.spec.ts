import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { ROUTES } from '../../shared/constants/routes.const';
import { SignInRequest, SignInResponse } from '../../shared/models/sign-in';
import { SignUpRequest, SignUpResponse } from '../../shared/models/sign-up';
import { go, signIn, signInFail, signInSuccess, signUp, signUpFail, signUpSuccess } from '../actions';
import { UserEffects } from './user.effect';
import { SignUpService } from '../../shared/services/sign-up.service';
import { SignInService } from '../../shared/services/sign-in.service';
import { IUser } from '../../shared/models/iuser';
import { API } from '../../shared/constants/api.const';
import { GeneralError } from '../../shared/models/store';

describe('UserEffects', () => {
  let actions$: Observable<Action>;
  let effects: UserEffects;
  let store: MockStore;
  let signInService: SignInService;
  let signUpService: SignUpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserEffects, provideMockStore(), provideMockActions(() => actions$), SignInService, SignUpService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(UserEffects);
    signInService = TestBed.inject(SignInService);
    signUpService = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(store, 'dispatch');
    jest.spyOn(signInService, 'signIn').mockReturnValue(of({} as SignInResponse));
  });

  it('should be created', () => {
    expect(effects).toBeDefined();
  });

  describe('signUpUser', () => {
    it('should navigate to home if signInSuccess action is called', () => {
      jest.spyOn(signUpService, 'signUp').mockReturnValue(of({} as SignUpResponse));
      actions$ = of(signUp({ payload: {} as SignUpRequest }));

      effects.signUpUser$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(signUpSuccess({ payload: {} as SignUpResponse }));
    });
    it('should navigate to home if signUpSuccess action is called', () => {
      jest.spyOn(signUpService, 'signUp').mockReturnValue(throwError({ error: { errors: {} as GeneralError } }));
      actions$ = of(signUp({ payload: {} as SignUpRequest }));

      effects.signUpUser$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(signUpFail({ errors: {} as GeneralError }));
    });
  });

  describe('signInUser', () => {
    it('should navigate to home if signInSuccess action is called', () => {
      jest.spyOn(signInService, 'signIn').mockReturnValue(of({} as SignUpResponse));
      actions$ = of(signIn({ payload: {} as SignInRequest }));

      effects.signInUser$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(signInSuccess({ payload: {} as SignInResponse }));
    });
    it('should navigate to home if signUpSuccess action is called', () => {
      jest.spyOn(signInService, 'signIn').mockReturnValue(throwError({ error: { errors: {} as GeneralError } }));
      actions$ = of(signIn({ payload: {} as SignUpRequest }));

      effects.signInUser$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(signInFail({ errors: {} as GeneralError }));
    });
  });

  describe('goToSpecificRoute', () => {
    it('should navigate to home if signInSuccess action is called', () => {
      actions$ = of(signInSuccess({ payload: {} as SignInResponse }));

      effects.redirectToHome$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.Home }));
    });
    it('should navigate to home if signUpSuccess action is called', () => {
      actions$ = of(signUpSuccess({ payload: {} as SignUpResponse }));

      effects.redirectToHome$.subscribe();
      expect(store.dispatch).toHaveBeenCalledWith(go({ path: ROUTES.Home }));
    });
  });
});
