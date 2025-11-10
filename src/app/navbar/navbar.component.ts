import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '../store/actions/auth.actions';
import { selectCurrentUser, selectIsAuthenticated } from '../store/selectors/auth.selectors';
import { AppUser } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isAuthenticated$!: Observable<boolean>;
  currentUser$!: Observable<AppUser | null>;

  constructor(private store: Store, private router: Router) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logoutSuccess());
    this.router.navigate(['/auth']);
  }
}