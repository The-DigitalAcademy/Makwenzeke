import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface Task {
  id: string;
  userID: string;
  title: string;
  description: string;
  status :'OVERDUE' | 'COMPLETED' | 'PENDING';
  date: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskState extends EntityState<Task> {
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    priority: string;
    user: string;
  };
}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: (task: Task) => task.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const initialTaskState: TaskState = taskAdapter.getInitialState({
  selectedTaskId: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    user: ''
  }
});