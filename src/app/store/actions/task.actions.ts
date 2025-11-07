import { createAction, props } from '@ngrx/store';
import { ToDo, ToDoData } from 'src/app/models/models';

// Load CURRENT USER'S Tasks Only
export const loadCurrentUserTasks = createAction('[Task] Load Current User Tasks');

export const loadCurrentUserTasksSuccess = createAction(
  '[Task] Load Current User Tasks Success',
  props<{ tasks: ToDo[] }>()
);

export const loadCurrentUserTasksFailure = createAction(
  '[Task] Load Current User Tasks Failure',
  props<{ error: string }>()
);

// Create Task for CURRENT USER
export const createTaskForCurrentUser = createAction(
  '[Task] Create Task For Current User',
  props<{ taskData: Omit<ToDoData, 'userID'> }>() // userID will be auto-added
);

export const createTaskSuccess = createAction(
  '[Task] Create Task Success',
  props<{ task: ToDo }>()
);

export const createTaskFailure = createAction(
  '[Task] Create Task Failure',
  props<{ error: string }>()
);

// Update CURRENT USER'S Task Status
export const updateCurrentUserTaskStatus = createAction(
  '[Task] Update Current User Task Status',
  props<{ id: string; status: ToDo['status'] }>()
);

export const updateTaskStatusSuccess = createAction(
  '[Task] Update Task Status Success',
  props<{ task: ToDo }>()
);

export const updateTaskStatusFailure = createAction(
  '[Task] Update Task Status Failure',
  props<{ error: string }>()
);

// Delete CURRENT USER'S Task
export const deleteCurrentUserTask = createAction(
  '[Task] Delete Current User Task',
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success',
  props<{ id: string }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure',
  props<{ error: string }>()
);

// Filter CURRENT USER'S Tasks
export const setTaskFilters = createAction(
  '[Task] Set Filters',
  props<{ filters: { status?: string; priority?: string } }>()
);

// Clear Error
export const clearTaskError = createAction('[Task] Clear Error');

export function loadTasks(arg0: { userId: string; }): any {
  throw new Error('Function not implemented.');
}
export function updateTask(arg0: { task: { completed: boolean; id?: string; userID: string; title: string; description: string; status: "OVERDUE" | "COMPLETED" | "PENDING"; priority: "low" | "medium" | "high"; date: string; dueDate: string; createdAt: string; updatedAt: string; }; }): any {
  throw new Error('Function not implemented.');
}

export function deleteTask(arg0: { taskId: number; }): any {
  throw new Error('Function not implemented.');
}

