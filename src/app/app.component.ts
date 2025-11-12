import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { selectIsEditModalOpen } from './store/selectors/task.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showEditModal$: Observable<boolean>;
  title = 'Makwenzeke';

constructor (private store: Store) {
  this.showEditModal$ = this.store.select(selectIsEditModalOpen)
}
}