import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../state/auth.state'

// Get the auth feature state
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select current user
export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Select current user's ID
export const selectCurrentUserId = createSelector(
  selectCurrentUser,
  (user) => user?.id || null
);

// Select authentication status
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

// Select auth loading state
export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

// Select auth error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);