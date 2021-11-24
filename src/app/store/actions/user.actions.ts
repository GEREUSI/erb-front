import { createAction, props } from '@ngrx/store';
import { SignInRequest, SignInResponse } from 'src/app/shared/models/sign-in';
import { SignUpRequest, SignUpResponse } from 'src/app/shared/models/sign-up';
import { GeneralError } from 'src/app/shared/models/store';
import { IUser } from 'src/app/shared/models/user';

export enum UserActions {
  SignIn = '[User] Sign in',
  SignInSuccess = '[User] Sign in success',
  SignInFail = '[User] Sign in fail',
  SignUp = '[User] Sign up',
  SignUpSuccess = '[User] Sign up success',
  SignUpFail = '[User] Sign up fail',
  LogOut = '[User] Log out',
  SetUserToken = '[User] Set user token',
  LoadUserData = '[User] Load user data',
  LoadUserDataSuccess = '[User] Load user data success',
  LoadUserDataFail = '[User] Load user data fail',
}

export const signIn = createAction(UserActions.SignIn, props<{ payload: SignInRequest }>());

export const signInSuccess = createAction(UserActions.SignInSuccess, props<{ payload: SignInResponse }>());

export const signInFail = createAction(UserActions.SignInFail, props<{ errors: GeneralError }>());

export const signUp = createAction(UserActions.SignUp, props<{ payload: SignUpRequest }>());

export const signUpSuccess = createAction(UserActions.SignUpSuccess, props<{ payload: SignUpResponse }>());

export const signUpFail = createAction(UserActions.SignUpFail, props<{ errors: GeneralError }>());

export const logOut = createAction(UserActions.LogOut);

export const setUserToken = createAction(UserActions.SetUserToken, props<{ token: string }>());

export const loadUserData = createAction(UserActions.LoadUserData, props<{ token: string }>());

export const loadUserDataSuccess = createAction(UserActions.LoadUserDataSuccess, props<{ payload: IUser }>());

export const loadUserDataFail = createAction(UserActions.LoadUserDataFail, props<{ errors: GeneralError }>());
