import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/shared/models/user';
import { LoadingStatus } from 'src/app/shared/models/store';
import { logOut, signIn, signInFail, signInSuccess, signUp, signUpFail, signUpSuccess } from '../actions/user.actions';

export interface State {
  signUpLoadingStatus: LoadingStatus;
  signInLoadingStatus: LoadingStatus;
  user?: IUser;
  token?: string;
}

export const initialState: State = {
  signUpLoadingStatus: {
    loaded: false,
    loading: false,
  },
  signInLoadingStatus: {
    loaded: false,
    loading: false,
  },
};

const reducer: ActionReducer<State> = createReducer(
  initialState,
  on(signUp, (state) => ({
    ...state,
    signUpLoadingStatus: {
      loading: true,
      loaded: false,
      errors: undefined,
    },
  })),
  on(signUpSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
    signUpLoadingStatus: {
      loading: false,
      loaded: true,
    },
  })),
  on(signUpFail, (state, { errors }) => ({
    ...state,
    signUpLoadingStatus: {
      loading: false,
      loaded: false,
      errors,
    },
  })),
  on(signIn, (state) => ({
    ...state,
    signInLoadingStatus: {
      loading: true,
      loaded: false,
      errors: undefined,
    },
  })),
  on(signInSuccess, (state, { payload }) => ({
    ...state,
    ...payload,
    signInLoadingStatus: {
      loading: false,
      loaded: true,
    },
  })),
  on(signInFail, (state, { errors }) => ({
    ...state,
    token: 'asdasdads',
    signInLoadingStatus: {
      loading: false,
      loaded: false,
      errors,
    },
  })),
  on(logOut, () => initialState)
);

export function userReducer(state: State | undefined, action: Action): State {
  return reducer(state, action);
}
