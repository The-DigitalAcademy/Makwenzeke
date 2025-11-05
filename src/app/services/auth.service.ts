import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AppUser } from '../models/user.models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userData = new BehaviorSubject<AppUser | null>(null);
  userData$ = this.userData.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  getUserData(): AppUser | null {
    return this.userData.value;
  }

  getUserId(): Observable<string> {
    return this.userData$.pipe(
      filter((user): user is AppUser => user !== null),
      map(user => user.id)
    );
  }

  // Use to check whether user logged in (hide , display app component based on this boolean)
  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$;
  }

  // if user success llogin,update user data and loggedIn boolean variable
  setUserData(user: AppUser | null): void {
    this.userData.next(user);
    this.loggedIn.next(user !== null);
  }

  // clear/remove user data on logout.
  logout(): void {
    this.userData.next(null);
    this.loggedIn.next(false);
  }
}