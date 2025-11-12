import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToDo, AppUser } from 'src/app/models/models';
import * as TaskActions from '../../store/actions/task.actions';
import * as TaskSelectors from '../../store/selectors/task.selectors';
import * as AuthSelectors from '../../store/selectors/auth.selectors';

@Component({
  selector:'app-task-manager',
  templateUrl:'./task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  // Change from arrays to Observables
  todos$: Observable<ToDo[]>;
  filteredTodos$: Observable<ToDo[]>;
  currentUser$: Observable<AppUser | null>;
  loading$: Observable<boolean>;
  
  // Keep your filters
  statusFilter: string = '';
  priorityFilter: string = '';
  // Remove userFilter since we're only showing current user's tasks

  // User mapping for display (keep this)
  userMap: { [key: string]: string } = {
    'a3f2c8e1-4b6d-4c9a-8f2e-1d3b5c7a9e0f': 'Musa_Gumede',
    'b7d4e9f2-3c5a-4d8b-9e1f-2a4c6d8b0e1a': 'Nomthi',
    'c1e5a3b7-2d4f-4a9c-8e0b-3f5d7c9a1e2b': 'BongaG'
  };

  // Change constructor to use Store instead of TaskService
  constructor(private store: Store) {
    // Initialize observables from the store
    this.todos$ = this.store.select(TaskSelectors.selectCurrentUserTasks);
    this.filteredTodos$ = this.store.select(TaskSelectors.selectFilteredCurrentUserTasks);
    this.currentUser$ = this.store.select(AuthSelectors.selectCurrentUser);
    this.loading$ = this.store.select(TaskSelectors.selectTasksLoading);
  }

  ngOnInit() {
    // Change to load current user's tasks only
    this.loadCurrentUserTodos();
  }

  loadCurrentUserTodos() {
    // Dispatch action to load only current user's tasks
    this.store.dispatch(TaskActions.loadCurrentUserTasks());
  }

  onTaskCreated(newTask: ToDo) {
    // This will now be handled automatically by the store
    // The new task will appear in the list if it belongs to current user
  }

  onFormClosed() {
    // Optional: Handle form close if needed
  }

  // Update filter change methods to dispatch actions
  onStatusFilterChange(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  onPriorityFilterChange(priority: string) {
    this.priorityFilter = priority;
    this.applyFilters();
  }

  // Remove onUserFilterChange since we're not filtering by user anymore

  onStatusChange(todoId: string, newStatus: ToDo['status']) {
    // Change to dispatch action instead of calling service directly
    this.store.dispatch(TaskActions.updateCurrentUserTaskStatus({ 
      id: todoId, 
      status: newStatus 
    }));
  }

  onDeleteTodo(todoId: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      // Change to dispatch action instead of calling service directly
      this.store.dispatch(TaskActions.deleteCurrentUserTask({ id: todoId }));
    }
  }

  applyFilters() {
    // Dispatch action to update filters in the store
    this.store.dispatch(TaskActions.setTaskFilters({
      filters: {
        status: this.statusFilter,
        priority: this.priorityFilter,
        // Remove user filter
      }
    }));
  }

  getUserName(userId: string): string {
    return this.userMap[userId] || userId;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Add a method to get current user's display name
  getCurrentUserDisplayName(): Observable<string> {
    return this.currentUser$.pipe(
      map(user => user ? user.name : 'Guest')
    );
  }
}