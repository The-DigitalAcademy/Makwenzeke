import { createReducer, on } from '@ngrx/store';
import { taskAdapter, initialTaskState } from '../state/task.state';
import * as TaskActions from '../actions/task.actions';
import * as AuthActions from '../actions/auth.actions';

export const taskReducer = createReducer(
  initialTaskState,

  // Load Current User Tasks
  on(TaskActions.loadCurrentUserTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadCurrentUserTasksSuccess, (state, { tasks }) =>
    taskAdapter.setAll(tasks, { ...state, loading: false })
  ),
  on(TaskActions.loadCurrentUserTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Create Task
  on(TaskActions.createTaskForCurrentUser, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.createTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, { ...state, loading: false })
  ),
  on(TaskActions.createTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Task Status
  on(TaskActions.updateCurrentUserTaskStatus, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.updateTaskStatusSuccess, (state, { task }) =>
    taskAdapter.updateOne(
      { id: task.id!, changes: task },
      { ...state, loading: false }
    )
  ),
  on(TaskActions.updateTaskStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Task
  on(TaskActions.deleteCurrentUserTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.deleteTaskSuccess, (state, { id }) =>
    taskAdapter.removeOne(id, { ...state, loading: false })
  ),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Filters
  on(TaskActions.setTaskFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),

  // Clear tasks when user logs out
  on(AuthActions.logoutSuccess, (state) =>
    taskAdapter.removeAll({ ...state })
  ),

  // Clear Error
  on(TaskActions.clearTaskError, (state) => ({
    ...state,
    error: null
  }))
);