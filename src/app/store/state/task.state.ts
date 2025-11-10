import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ToDo } from 'src/app/models/models';

// Use your existing ToDo interface for the Task state
export interface TaskState extends EntityState<ToDo> {
  todos: any;
  selectedTaskId: string | null;
  loading: boolean;
  error: string | null;
  filters: {
    status: string;
    priority: string;
  };
}

// Create entity adapter for optimized CRUD operations
export const taskAdapter: EntityAdapter<ToDo> = createEntityAdapter<ToDo>({
  selectId: (task: ToDo) => task.id!, // Use non-null assertion since id is optional
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

// Initial state
export const initialTaskState: TaskState = taskAdapter.getInitialState({
  selectedTaskId: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    AppUser: ''
  }
});