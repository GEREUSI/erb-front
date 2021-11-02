import { Action } from '@ngrx/store';
import { IUser } from '../../shared/models/user';
import { SignUpRequest, SignUpResponse } from '../../shared/models/sign-up';
import { UserState } from './index';
import { signIn, signInFail, signInSuccess, signUp, signUpFail, signUpSuccess } from '../actions';
import { initialState, userReducer } from './user.reducer';
import { GeneralError } from 'src/app/shared/models/store';
import { SignInRequest, SignInResponse } from 'src/app/shared/models/sign-in';

describe('User reducer', () => {
  describe('an unknown action', () => {
    it('should return previous state', () => {
      const action: Action = {} as Action;
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('signUp action', () => {
    it('should set sign up loading and reset error', () => {
      const payload: SignUpRequest = { username: '', password: '', email: '' };
      const action: Action = signUp({ payload });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        signUpLoadingStatus: { loaded: false, loading: true, errors: undefined },
      });
    });
  });

  describe('signUpSuccess action', () => {
    it('should set sign up to loaded', () => {
      const payload: SignUpResponse = { user: {} as IUser, token: '' };
      const action: Action = signUpSuccess({ payload });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: {} as IUser,
        token: '',
        signUpLoadingStatus: {
          loaded: true,
          loading: false,
        },
      });
    });
  });

  describe('signUpFail action', () => {
    it('should set sign up error', () => {
      const errors: GeneralError = { message: '' };
      const action: Action = signUpFail({ errors });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        signUpLoadingStatus: { loaded: false, loading: false, errors: { message: '' } },
      });
    });
  });

  describe('signIn action', () => {
    it('should set sign in loading and reset error', () => {
      const payload: SignInRequest = { password: '', email: '' };
      const action: Action = signIn({ payload });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        signInLoadingStatus: { loaded: false, loading: true, errors: undefined },
      });
    });
  });

  describe('signInSuccess action', () => {
    it('should set sign in to loaded', () => {
      const payload: SignInResponse = { user: {} as IUser, token: '' };
      const action: Action = signInSuccess({ payload });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        user: {} as IUser,
        token: '',
        signInLoadingStatus: {
          loaded: true,
          loading: false,
        },
      });
    });
  });

  describe('signInFail action', () => {
    it('should set sign in error', () => {
      const errors: GeneralError = { message: '' };
      const action: Action = signInFail({ errors });
      const result: UserState = userReducer(initialState, action);

      expect(result).toEqual({
        ...initialState,
        signInLoadingStatus: { loaded: false, loading: false, errors: { message: '' } },
      });
    });
  });
});
