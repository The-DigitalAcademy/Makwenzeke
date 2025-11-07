import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/models';
import { loadCurrentUserTasks, loadCurrentUserTasksFailure, loadCurrentUserTasksSuccess, clearTaskError, createTaskFailure, createTaskSuccess, createTaskForCurrentUser,deleteTask, deleteCurrentUserTask, deleteTaskFailure, deleteTaskSuccess, updateCurrentUserTaskStatus, updateTask, updateTaskStatusFailure, updateTaskStatusSuccess } from 'src/app/store/actions/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {

}
