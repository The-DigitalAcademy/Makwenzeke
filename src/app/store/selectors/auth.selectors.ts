import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);