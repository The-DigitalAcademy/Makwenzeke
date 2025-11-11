

import { Component } from '@angular/core'; 
import { TaskState } from 'src/app/store/state/task.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDo } from '../../models/models';
import * as TaskActions from '../../store/actions/task.actions';
import { selectAllTasks, selectTasksLoading, selectTasksError } from '../../store/selectors/task.selectors';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks$: Observable<ToDo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store<TaskState>) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTasksLoading);
    this.error$ = this.store.select(selectTasksError);
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
    this.store.dispatch(TaskActions.addTask({ taskData: newTask }));
  }

  setTaskFilters(filters: any): void {
    // Your filter implementation
    console.log('Setting filters:', filters);
  }

  deleteCurrentUserTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }
}