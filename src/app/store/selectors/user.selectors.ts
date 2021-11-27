import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserType } from 'src/app/shared/models/user';
import { UserState } from '../reducers';

export const getUserState = createFeatureSelector<UserState>('user');

export const getIsSignUpLoading = createSelector(getUserState, (state) => state.signUpLoadingStatus.loading);

export const getIsSignInLoading = createSelector(getUserState, (state) => state.signInLoadingStatus.loading);

export const getIsUserDataLoading = createSelector(getUserState, (state) => state.userDataLoadingStatus.loading);

export const getSignUpHasErrors = createSelector(getUserState, (state) => !!state.signUpLoadingStatus.errors);

export const getSignInHasErrors = createSelector(getUserState, (state) => !!state.signInLoadingStatus.errors);

export const getSignUpErrors = createSelector(getUserState, (state) => state.signUpLoadingStatus.errors?.message || '');

export const getSignInErrors = createSelector(getUserState, (state) => state.signInLoadingStatus.errors?.message || '');

export const getIsAuthenticatedUser = createSelector(getUserState, (state) => !!state.token && !!state.user);

export const getAuthenticatedUserId = createSelector(getUserState, (state) => state.user?.id);

export const getIsUserRenter = createSelector(getUserState, (state) => state.user?.typeId === UserType.Renter);

export const getAuthenticatedUserToken = createSelector(getUserState, (state) => state.token);