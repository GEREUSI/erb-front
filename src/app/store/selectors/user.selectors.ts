import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers';

export const getUserState = createFeatureSelector<UserState>('user');

export const getIsSignUpLoading = createSelector(getUserState, (state) => state.signUpLoadingStatus.loading);

export const getIsSignInLoading = createSelector(getUserState, (state) => state.signInLoadingStatus.loading);

export const getSignUpHasErrors = createSelector(getUserState, (state) => !!state.signUpLoadingStatus.errors);

export const getSignInHasErrors = createSelector(getUserState, (state) => !!state.signInLoadingStatus.errors);

export const getSignUpErrors = createSelector(getUserState, (state) => state.signUpLoadingStatus.errors?.message || '');

export const getSignInErrors = createSelector(getUserState, (state) => state.signInLoadingStatus.errors?.message || '');
