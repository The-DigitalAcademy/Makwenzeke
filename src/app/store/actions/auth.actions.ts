import { createAction, props } from '@ngrx/store';
import { AppUser } from '../state/auth.state';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: AppUser }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Set Current User
export const setCurrentUser = createAction(
  '[Auth] Set Current User',
  props<{ user: AppUser }>()
);

// Clear Error
export const clearAuthError = createAction('[Auth] Clear Error');