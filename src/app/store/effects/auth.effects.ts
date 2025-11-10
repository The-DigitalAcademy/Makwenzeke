import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  // Login Effect - Connects login action to AuthService
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => {
            // Extract error message from the error object
            const errorMessage = error.message || 'Login failed';
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      )
    )
  );

  // Login Success Effect - Redirect to dashboard
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ user }) => {
        console.log('Login successful, redirecting to dashboard');
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  // Login Failure Effect - You can handle errors here (show notification, etc.)
  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(({ error }) => {
        console.error('Login failed:', error);
        // You could show a toast notification here
      })
    ),
    { dispatch: false }
  );

  // Logout Effect - Connects logout action to AuthService
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
        // Dispatch logout success immediately since logout() is synchronous
        return AuthActions.logoutSuccess();
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  // Logout Success Effect - Redirect to login page
  logoutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutSuccess),
      tap(() => {
        console.log('Logout successful, redirecting to login');
        this.router.navigate(['/login']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}