export interface AppUser {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface ToDo {
  id?: string;
  userID: string;
  title: string;
  description: string;
  status :'OVERDUE' | 'COMPLETED' | 'PENDING';
  priority: 'low' | 'medium' | 'high';
  date: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;

}
// used when creating a new ToDo task on the UI.
export type ToDoData = Omit<ToDo, 'id'| 'createdAt'| 'updatedAt'>;

export interface AuthState {
  user: AppUser | null;
  isAuthenticated: boolean;
  error: string | null;
}

// export interface ToDoState {
//   tasks: ToDo[];
//   loading: boolean;
//   error: string | null;
//   successMessage: string | null;
// }