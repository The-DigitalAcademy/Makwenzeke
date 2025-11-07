import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { TaskService } from 'src/app/services/task.service';
import * as TaskActions from '../actions/task.actions';
import * as AuthSelectors from '../selectors/auth.selectors';
import { ToDoData } from 'src/app/models/models';

@Injectable()
export class TaskEffects {
  // Load CURRENT USER'S Tasks Effect
  loadCurrentUserTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.loadCurrentUserTasks),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([action, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.loadCurrentUserTasksFailure({ 
            error: 'No user logged in' 
          }));
        }
        
        return this.taskService.getTasksByUserId(currentUser.id).pipe(
          map((tasks) => TaskActions.loadCurrentUserTasksSuccess({ tasks })),
          catchError((error) => of(TaskActions.loadCurrentUserTasksFailure({ error: error.message })))
        );
      })
    )
  );

  // Create Task for CURRENT USER Effect
  createTaskForCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.createTaskForCurrentUser),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([{ taskData }, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.createTaskFailure({ 
            error: 'No user logged in' 
          }));
        }

        // Auto-add the current user's ID to the task
        const taskDataWithUser: ToDoData = {
          ...taskData,
          userID: currentUser.id
        };

        return this.taskService.createTask(taskDataWithUser).pipe(
          map((task) => TaskActions.createTaskSuccess({ task })),
          catchError((error) => of(TaskActions.createTaskFailure({ error: error.message })))
        );
      })
    )
  );

  // Update CURRENT USER'S Task Status Effect
  updateCurrentUserTaskStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.updateCurrentUserTaskStatus),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([{ id, status }, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.updateTaskStatusFailure({ 
            error: 'No user logged in' 
          }));
        }

        return this.taskService.updateTaskStatus(id, status).pipe(
          map((task) => TaskActions.updateTaskStatusSuccess({ task })),
          catchError((error) => of(TaskActions.updateTaskStatusFailure({ error: error.message })))
        );
      })
    )
  );

  // Delete CURRENT USER'S Task Effect
  deleteCurrentUserTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.deleteCurrentUserTask),
      withLatestFrom(this.store.select(AuthSelectors.selectCurrentUser)),
      mergeMap(([{ id }, currentUser]) => {
        if (!currentUser) {
          return of(TaskActions.deleteTaskFailure({ 
            error: 'No user logged in' 
          }));
        }

        return this.taskService.deleteTask(id).pipe(
          map(() => TaskActions.deleteTaskSuccess({ id })),
          catchError((error) => of(TaskActions.deleteTaskFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private store: Store
  ) {}
}