import { createAction, props } from '@ngrx/store';
import { ROUTES } from 'src/app/constants/routes.const';
import { SignInRequest, SignInResponse } from 'src/app/models/sign-in';
import { SignUpRequest, SignUpResponse } from 'src/app/models/sign-up';
import { GeneralError } from 'src/app/models/store';

export enum UserActions {
    SignIn = '[User] Sign in',
    SignInSuccess = '[User] Sign in success',
    SignInFail = '[User] Sign in fail',
    SignUp = '[User] Sign up',
    SignUpSuccess = '[User] Sign up success',
    SignUpFail = '[User] Sign up fail',
}

export const signIn = createAction(
    UserActions.SignIn,
    props<{payload: SignInRequest}>()
);

export const signInSuccess = createAction(
    UserActions.SignInSuccess,
    props<{payload: SignInResponse}>()
);

export const signInFail = createAction(
    UserActions.SignInFail,
    props<{errors: GeneralError}>()
    );

export const signUp = createAction(
    UserActions.SignUp,
    props<{payload: SignUpRequest}>()
);

export const signUpSuccess = createAction(
    UserActions.SignUpSuccess,
    props<{payload: SignUpResponse}>()
);

export const signUpFail = createAction(
    UserActions.SignUpFail,
    props<{errors: GeneralError}>()
    );
