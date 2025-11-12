import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { ToDo } from '../../models/models';
import * as TaskActions from '../actions/task.actions';

export interface TaskState extends EntityState<ToDo> {
  loading: boolean;
  error: string | null;
}

export const taskAdapter: EntityAdapter<ToDo> = createEntityAdapter<ToDo>();

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  loading: false,
  error: null,
});

const _taskReducer = createReducer(
  initialTaskState,

  // Load Tasks - Fix the action creators
  on(TaskActions.loadTasks, (state, { userId }) => ({ // Make sure action has proper payload
    ...state,
    loading: true,
    error: null,
  })),

  on(TaskActions.loadTasksSuccess, (state, { tasks }) => 
    taskAdapter.setAll(tasks, {
      ...state,
      loading: false,
    })
  ),

  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Task
  on(TaskActions.addTask, (state, { taskData }) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.addTaskSuccess, (state, { task }) =>
    taskAdapter.addOne(task, {
      ...state,
      loading: false,
    })
  ),

    // Edit Task
  on(TaskActions.editTask, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(TaskActions.editTaskSuccess, (state, { task }) =>
    taskAdapter.updateOne(
      {
        id: task.id,
        changes: task
      },
      {
        ...state,
        loading: false,
        editingTask: null,
        isEditModalOpen: false
      }
    )
  ),

  on(TaskActions.editTaskFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Edit Modal
  on(TaskActions.openEditTaskModal, (state, { task }) => ({
    ...state,
    editingTask: task,
    isEditModalOpen: true
  })),

  on(TaskActions.closeEditTaskModal, (state) => ({
    ...state,
    editingTask: null,
    isEditModalOpen: false
  })),

  // Update Task Status
  on(TaskActions.updateTaskStatus, (state, { id, status }) =>
    taskAdapter.updateOne(
      {
        id,
        changes: { status:'COMPLETED' },
      },
      {
        ...state,
        loading: false,
      }
    )
  ),

  // Delete Task - Fix the action payload
  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    loading: true,
  })),

  on(TaskActions.deleteTaskSuccess, (state, { taskId }) =>
    taskAdapter.removeOne(taskId, {
      ...state,
      loading: false,
    })
  )
);

export function taskReducer(state: TaskState | undefined, action: Action) {
  return _taskReducer(state, action);
}