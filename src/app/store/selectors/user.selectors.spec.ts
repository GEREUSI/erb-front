import { userError } from '@angular/compiler-cli/src/transformers/util';
import { State } from '../reducers';
import {
  getIsSignInLoading,
  getIsSignUpLoading,
  getSignInErrors,
  getSignInHasErrors,
  getSignUpErrors,
  getSignUpHasErrors,
  getUserState,
} from './user.selectors';

describe('user selectors', () => {
  let state: State;
  beforeEach(() => {
    state = {
      user: {
        signUpLoadingStatus: {
          loading: false,
          loaded: true,
        },
        signInLoadingStatus: {
          loading: true,
          loaded: false,
          errors: { message: 'error' },
        },
      },
    } as State;
  });
  describe('getIsSignUpLoading', () => {
    it('should get loading status', () => {
      expect(getIsSignUpLoading.projector(state.user)).toEqual(false);
    });
  });
  describe('getIsSignInLoading', () => {
    it('should get loading status', () => {
      expect(getIsSignInLoading.projector(state.user)).toEqual(true);
    });
  });
  describe('getSignUpHasErrors', () => {
    it('should get if has erros status', () => {
      expect(getSignUpHasErrors.projector(state.user)).toEqual(false);
    });
  });
  describe('getSignInHasErrors', () => {
    it('should get if has erros status', () => {
      expect(getSignInHasErrors.projector(state.user)).toEqual(true);
    });
  });
  describe('getSignUpErrors', () => {
    it('should return empty string if errors is undefined', () => {
      expect(getSignUpErrors.projector(state.user)).toEqual('');
    });
    it('should return error', () => {
      state = {
        user: {
          ...state.user,
          signUpLoadingStatus: {
            ...state.user.signInLoadingStatus,
          },
        },
      };

      expect(getSignUpErrors.projector(state.user)).toEqual('error');
    });
  });
  describe('getSignInErrors', () => {
    it('should return empty string if errors is undefined', () => {
      state = {
        user: {
          ...state.user,
          signInLoadingStatus: {
            ...state.user.signUpLoadingStatus,
          },
        },
      };

      expect(getSignInErrors.projector(state.user)).toEqual('');
    });
    it('should return error', () => {
      expect(getSignInErrors.projector(state.user)).toEqual('error');
    });
  });
});
