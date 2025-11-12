

import { createAction, props } from '@ngrx/store';
import { ToDo } from '../../models/models';

// Load Tasks
export const loadTasks = createAction(
  '[Task] Load Tasks',
  props<{ userId: string }>()
);

export const loadUserTasks = createAction(
  '[Task] Load Current User Tasks',
)

export const loadTasksSuccess = createAction(
  '[Task] Load Tasks Success',
  props<{ tasks: ToDo[] }>()
);

export const loadTasksFailure = createAction(
  '[Task] Load Tasks Failure',
  props<{ error: string }>()
);

// Add Task
export const addTask = createAction(
  '[Task] Add Task',
  props<{ taskData: Omit<ToDo, 'id'> }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: ToDo }>()
);

export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
 props<{ error: string}>()
);

// Add these to your existing actions:

// Edit Task Actions
export const editTask = createAction(
  '[Task] Edit Task',
  props<{ taskId: string; updates: Partial<ToDo> }>()
);

export const editTaskSuccess = createAction(
  '[Task] Edit Task Success', 
  props<{ task: ToDo }>()
);

export const editTaskFailure = createAction(
  '[Task] Edit Task Failure',
  props<{ error: string }>()
);

// For opening/closing edit modal
export const openEditTaskModal = createAction(
  '[Task] Open Edit Task Modal',
  props<{ task: ToDo }>()
);

export const closeEditTaskModal = createAction(
  '[Task] Close Edit Task Modal'
);
// Update Task Status
export const updateTaskStatus = createAction(
  '[Task] Update Task Status',
  props<{ id: string; status: string}>()
);

export const updateTaskStatusSuccess = createAction(
  '[Task] Update Task Status Success',
  props<{ task: ToDo }>()
);

export const updateTaskStatusFailure = createAction(
  '[Task] Update Task Status Failure',
  props<{ error: string }>()
);

// Delete Task
export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ taskId: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);

// Filter CURRENT USER'S Tasks
// export const setTaskFilters = createAction(
//   '[Task] Set Filters',
//   props<{ filters: { status?: string; priority?: string } }>()
// );

// export function loadCurrentUserTasks(): any {
//   throw new Error('Function not implemented.');
// }
// export function updateCurrentUserTaskStatus(arg0: { id: string; status: string; }): any {
//   throw new Error('Function not implemented.');
// }

// export function deleteCurrentUserTask(arg0: { id: string; }): any {
//   throw new Error('Function not implemented.');
// }

