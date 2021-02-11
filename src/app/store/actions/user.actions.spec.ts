import { SignInRequest, SignInResponse } from '../../shared/models/sign-in';
import { ROUTES } from '../../shared/constants/routes.const';
import { go, RoutingActions } from './routing.actions';
import { signIn, signInFail, signInSuccess, signUp, signUpFail, signUpSuccess, UserActions } from './user.actions';
import { GeneralError } from 'src/app/shared/models/store';
import { SignUpRequest, SignUpResponse } from 'src/app/shared/models/sign-up';

describe('user actions', () => {
  it('it should create signIn action', () => {
    const action = signIn({ payload: {} as SignInRequest });
    expect(action).toEqual({
      payload: {} as SignInRequest,
      type: UserActions.SignIn,
    });
  });
  it('it should create signInSuccess action', () => {
    const action = signInSuccess({ payload: {} as SignInResponse });
    expect(action).toEqual({
      payload: {} as SignInResponse,
      type: UserActions.SignInSuccess,
    });
  });
  it('it should create SignInFail action', () => {
    const action = signInFail({ errors: {} as GeneralError });
    expect(action).toEqual({
      errors: {} as GeneralError,
      type: UserActions.SignInFail,
    });
  });
  it('it should create signUp action', () => {
    const action = signUp({ payload: {} as SignUpRequest });
    expect(action).toEqual({
      payload: {} as SignUpRequest,
      type: UserActions.SignUp,
    });
  });
  it('it should create signUpSuccess action', () => {
    const action = signUpSuccess({ payload: {} as SignUpResponse });
    expect(action).toEqual({
      payload: {} as SignUpResponse,
      type: UserActions.SignUpSuccess,
    });
  });
  it('it should create signUpFail action', () => {
    const action = signUpFail({ errors: {} as GeneralError });
    expect(action).toEqual({
      errors: {} as GeneralError,
      type: UserActions.SignUpFail,
    });
  });
});
