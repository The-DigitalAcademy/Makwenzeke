// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import { TaskState, taskAdapter } from '../state/task.state';
// import { selectCurrentUserId } from './auth.selectors';

// // Get the task feature state
// export const selectTaskState = createFeatureSelector<TaskState>('todos');

// // Get the selectors from the entity adapter
// const { selectAll } = taskAdapter.getSelectors();

// // Select all tasks (for current user only in practice)
// export const selectAllTasks = createSelector(selectTaskState, (state: TaskState) => state.todos);

// // Select ONLY current user's tasks
// export const selectCurrentUserTasks = createSelector(
//   selectAllTasks,
//   selectCurrentUserId,
//   (tasks, currentUserId) => {
//     if (!currentUserId) return [];
//     return tasks.filter(todo => todo.userID === currentUserId);
//   }
// );
// // Select task filters
// export const selectTaskFilters = createSelector(
//   selectTaskState,
//   (state) => state.filters
// );

// // Select filtered tasks for CURRENT USER only
// export const selectFilteredCurrentUserTasks = createSelector(
//   selectCurrentUserTasks,
//   selectTaskFilters,
//   (userTasks, filters) => {
//     return userTasks.filter(todo => {
//       const statusMatch = !filters.status || todo.status === filters.status;
//       const priorityMatch = !filters.priority || todo.priority === filters.priority;
//       return statusMatch && priorityMatch;
//     });
//   }
// );


// // Select loading state
// export const selectTasksLoading = createSelector(
//   selectTaskState,
//   (state) => state.loading
// );

// // Select error
// export const selectTasksError = createSelector(
//   selectTaskState,
//   (state) => state.error
// );
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskState, taskAdapter } from '../reducers/task.reducers';
import { ToDo } from 'src/app/models/models';

export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Get all the entity selectors from the adapter
export const {
  selectAll: selectAllTodos,
  selectEntities: selectTodoEntities,
  selectIds: selectTodoIds,
  selectTotal: selectTotalTodos,
} = taskAdapter.getSelectors(selectTaskState);

// Custom selectors
export const selectLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.loading
);

export const selectError = createSelector(
  selectTaskState,
  (state: TaskState) => state.error
);

// Example filtered selectors with proper typing
export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos: ToDo[]) => todos.filter((todo: ToDo) => todo.completed)
);

export const selectPendingTodos = createSelector(
  selectAllTodos,
  (todos: ToDo[]) => todos.filter((todo: ToDo) => !todo.completed)
);