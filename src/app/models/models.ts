export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
}

export interface Task {
  id?: number;
  userId: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}