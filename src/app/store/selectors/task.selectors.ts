import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from '../state/task.state';
import { selectCurrentUserId } from './auth.selectors';

// Get the task feature state
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Get the selectors from the entity adapter
const { selectAll } = taskAdapter.getSelectors();

// Select all tasks (for current user only in practice)
export const selectAllTasks = createSelector(selectTaskState, (state: TaskState) => state.tasks);

// Select ONLY current user's tasks
export const selectCurrentUserTasks = createSelector(
  selectAllTasks,
  selectCurrentUserId,
  (tasks, currentUserId) => {
    if (!currentUserId) return [];
    return tasks.filter((task: { userID: string; }) => task.userID === currentUserId);
  }
);
// Select task filters
export const selectTaskFilters = createSelector(
  selectTaskState,
  (state) => state.filters
);

// Select filtered tasks for CURRENT USER only
export const selectFilteredCurrentUserTasks = createSelector(
  selectCurrentUserTasks,
  selectTaskFilters,
  (userTasks, filters) => {
    return userTasks.filter((task: { status: string; priority: string; }) => {
      const statusMatch = !filters.status || task.status === filters.status;
      const priorityMatch = !filters.priority || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    });
  }
);


// Select loading state
export const selectTasksLoading = createSelector(
  selectTaskState,
  (state) => state.loading
);

// Select error
export const selectTasksError = createSelector(
  selectTaskState,
  (state) => state.error
);
