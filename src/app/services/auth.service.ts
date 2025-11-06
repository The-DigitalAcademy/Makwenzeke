import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';
import { AppUser } from '../models/user.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4, v4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.API;

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

  // Login with email and password
  login(email: string, password: string): Observable<AppUser> {
    return this.http.get<AppUser[]>(`${this.url}/users?email=${email}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('User not found');
        }
        const user = users[0];
        // Verify password -plain text passwords. string must match.
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        // Remove password from user object before storing
        const { password: _, ...userWithoutPassword } = user;
        const safeUser = userWithoutPassword as AppUser;
        // Update user data and logged in status
        this.setUserData(safeUser);
        this.loggedIn.next(true);
        return safeUser;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
  }

  // Register a new user
  register(displayName: string, email: string, password: string): Observable<AppUser> {
    // Check if user already exists
    return this.http.get<AppUser[]>(`${this.url}/users?email=${email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('User with this email already exists');
        }
        return users;
      }),
      // Create new user
      map(() => {
        const newUser = {
          id: uuidv4(),
          displayName,
          email,
          password
        };
        return newUser;
      }),
      // Save to JSON server
      map(newUser => {
        this.http.post<AppUser>(`${this.url}/users`, newUser).subscribe(
          createdUser => {
            const { password: _, ...userWithoutPassword } = createdUser;
            const safeUser = userWithoutPassword as AppUser;
            this.setUserData(safeUser);
          }
        );
        return newUser;
      }),
      catchError(error => {
        console.error('Registration error:', error);
        return throwError(() => error);
      })
    );
  }

  // clear/remove user data on logout.
  logout(): void {
    this.userData.next(null);
    this.loggedIn.next(false);
  }
}