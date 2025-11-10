import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../store/actions/auth.actions';
import { selectCurrentUser, selectIsAuthenticated } from '../store/selectors/auth.selectors';
import { AppUser } from '../models/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<AppUser | null>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}