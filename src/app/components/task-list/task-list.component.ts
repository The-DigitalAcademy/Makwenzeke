// import { Component } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { Observable } from 'rxjs';
// import { ToDo } from '../../models/models';
// import { AppState } from '../../store/app.state';
// import * as TaskActions from '../../store/actions/task.actions';
// import { selectAllTodos, selectLoading, selectError } from '../../store/selectors/task.selectors';

// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.scss']
// })
// export class TaskListComponent {
//   todos$: Observable<ToDo[]>; // Add this missing property
//   loading$: Observable<boolean>;
//   error$: Observable<string | null>;

//   constructor(private store: Store<AppState>) {
//     this.todos$ = this.store.select(selectAllTodos);
//     this.loading$ = this.store.select(selectLoading);
//     this.error$ = this.store.select(selectError);
//   }

//   // Fix the method signature - accept individual parameters or a form object
//   createTaskForCurrentUser(title: string, description: string): void {
//     const newTask: Omit<ToDo, 'id'> = {
//       title: title,
//       description: description,
//       completed: false,
//       createdAt: new Date().toISOString(),
//       // Remove userId if it doesn't exist in ToDo interface, or add it to the interface
//     };
//     this.store.dispatch(TaskActions.addTask({ task: newTask }));
//   }

//   // Alternative if you're getting a complete task object
//   createTask(taskData: { title: string; description: string }): void {
//     this.createTaskForCurrentUser(taskData.title, taskData.description);
//   }

//   setTaskFilters(filters: any): void {
//     // Your filter implementation
//     console.log('Setting filters:', filters);
//   }

//   deleteCurrentUserTask(taskId: string): void {
//     this.store.dispatch(TaskActions.deleteTask({ taskId }));
//   }
// }

import { Component } from '@angular/core'; 
import { TaskState } from 'src/app/store/state/task.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDo } from '../../models/models';
import * as TaskActions from '../../store/actions/task.actions';
import { selectAllTodos, selectLoading, selectError } from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  todos$: Observable<ToDo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<TaskState>) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  // Fix the ToDo interface to include all required properties
  createTaskForCurrentUser(title: string, description: string): void {
    const newTask: Omit<ToDo, 'id'> = {
      title: title,
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
      userID: '',
      status: 'OVERDUE',
      priority: 'low',
      date: '',
      dueDate: '',
      updatedAt: ''
    };
    this.store.dispatch(TaskActions.addTask({ task: newTask }));
  }

  setTaskFilters(filters: any): void {
    // Your filter implementation
    console.log('Setting filters:', filters);
  }

  deleteCurrentUserTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ taskId }));
  }
}