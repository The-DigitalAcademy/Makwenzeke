import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  // GET /tasks - Get all tasks
  getAllTasks(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(this.apiUrl);
  }

  // GET /tasks/:id - Get task by ID
  getTaskById(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(`${this.apiUrl}/${id}`);
  }

  // POST /tasks - Create new task
  createTask(taskData: Omit<ToDo, 'id' | 'createdAt' | 'updatedAt'>): Observable<ToDo> {
    const newTask = {
      ...taskData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return this.http.post<ToDo>(this.apiUrl, newTask);
  }

  // PUT /tasks/:id - Update entire task
  updateTask(id: number, task: ToDo): Observable<ToDo> {
    const updatedTask = {
      ...task,
      updatedAt: new Date().toISOString()
    };
    return this.http.put<ToDo>(`${this.apiUrl}/${id}`, updatedTask);
  }

  // PATCH /tasks/:id - Partial update
  updateTaskStatus(id: number, status: ToDo['status']): Observable<ToDo> {
    const updateData = {
      status,
      updatedAt: new Date().toISOString()
    };
    return this.http.patch<ToDo>(`${this.apiUrl}/${id}`, updateData);
  }

  // DELETE /tasks/:id - Delete task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET tasks by status
  getTasksByStatus(status: ToDo['status']): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.apiUrl}?status=${status}`);
  }

  // GET tasks by priority
  getTasksByPriority(priority: ToDo['priority']): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.apiUrl}?priority=${priority}`);
  }
}