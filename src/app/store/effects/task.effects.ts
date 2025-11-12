import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import * as TaskActions from '../actions/task.actions';
import * as AuthSelectors from '../selectors/auth.selectors';
import { ToDoData } from 'src/app/models/models';
import { SCANNED_ACTIONS_SUBJECT_PROVIDERS } from '@ngrx/store/src/scanned_actions_subject';
import { AppState } from '../state/task.state';
import { ToDo } from 'src/app/models/models';

@Injectable()
export class TaskEffects {
  // Load CURRENT USER'S Tasks Effect
  loadCurrentUserTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadTasks),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([action, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.loadTasksFailure({ 
            error: 'No user logged in' 
          }));
        }
        
        return this.taskService.getTasksByUserId(currentUser.id).pipe(
          map((tasks) => TaskActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadTasksFailure({ error: error.message })))
        );
      })
    )
  );

  // Create Task for CURRENT USER Effect
  createTaskForCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.addTask),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([{taskData}, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.addTaskFailure({ 
            error: 'No user logged in' 
          }));
        }

        // Auto-add the current user's ID to the task
        const taskDataWithUser: ToDoData = {
          ...taskData,
          userID: currentUser.id
        };

        return this.taskService.createTask(taskDataWithUser).pipe(
          map((task) => TaskActions.addTaskSuccess({ task })),
          catchError((error) => of(TaskActions.addTaskFailure({ error: error.message })))
        );
      })
    )
  );
  // Edit Current User's tasks
    editTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.editTask),
      mergeMap(({ taskId, updates }) =>
        this.taskService.updateTask(taskId, updates).pipe(
          map((updatedTask: ToDo) => TaskActions.editTaskSuccess({ task: updatedTask })),
          catchError((error) => of(TaskActions.editTaskFailure({ error: error.message })))
        )
      )
    )
  );

  // Update CURRENT USER'S Task Status Effect
  updateCurrentUserTaskStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateTaskStatus),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([action, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.updateTaskStatusFailure({ 
            error: 'No user logged in' 
          }));
        }

        return this.taskService.updateTaskStatus(action.id, 'COMPLETED').pipe(
          map((task) => TaskActions.updateTaskStatusSuccess({ task })),
          catchError((error) => of(TaskActions.updateTaskStatusFailure({ error: error.message })))
        );
      })
    )
  );

  // Delete CURRENT USER'S Task Effect
  deleteCurrentUserTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteTask),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([action, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.deleteTaskFailure({ 
            error: 'No user logged in' 
          }));
        }

        return this.taskService.deleteTask(action.id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ taskId: action.id })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store<AppState>
  ) {}
}