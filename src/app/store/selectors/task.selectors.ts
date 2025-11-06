import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from '../../models/models';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectTasksLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectTasksError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

export const selectTasksSuccessMessage = createSelector(
  selectTaskState,
  (state: TaskState) => state.successMessage
);