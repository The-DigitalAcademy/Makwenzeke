import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from '../state/task.state';
import { selectCurrentUserId } from './auth.selectors';

// Get the task feature state
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Get the selectors from the entity adapter
const { selectAll, selectEntities, selectIds, selectTotal } = taskAdapter.getSelectors();

// Select all tasks (for current user only in practice)
export const selectAllTasks = createSelector(selectTaskState, selectAll);

// Select ONLY current user's tasks
export const selectCurrentUserTasks = createSelector(
  selectAllTasks,
  selectCurrentUserId,
  (tasks, currentUserId) => {
    if (!currentUserId) return [];
    if (!tasks) return [];
    return tasks.filter((task: any) => task.userID === currentUserId);
  }
);

// Select the task being edited
export const selectEditingTask = createSelector(
  selectTaskState,
  (state) => state.editingTask
);

// Select edit modal state
export const selectIsEditModalOpen = createSelector(
  selectTaskState,
  (state) => state.isEditModalOpen
);

// Select task by ID (useful for editing)
export const selectTaskById = (taskId: string) => createSelector(
  selectAllTasks,
  (tasks) => tasks.find(task => task.id === taskId)
);
// Select task filters
export const selectTaskFilters = createSelector(
  selectTaskState,
  (state) => state.filters || {} 
);

// Select filtered tasks for CURRENT USER only
export const selectFilteredCurrentUserTasks = createSelector(
  selectCurrentUserTasks,
  selectTaskFilters,
  (userTasks, filters) => {
    if (!userTasks) return [];
    if (!filters) return userTasks;
    return userTasks.filter((task: any) => {
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
