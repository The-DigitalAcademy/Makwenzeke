import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToDo } from '../../models/todo.models';

@Component({
  selector: 'app-task-manager',
  template: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  todos: ToDo[] = [];
  filteredTodos: ToDo[] = [];
  
  statusFilter: string = '';
  priorityFilter: string = '';
  userFilter: string = '';

  newTodo: Omit<ToDo, 'id' | 'createdAt' | 'updatedAt'> = {
    description: '',
    status: 'PENDING',
    date: new Date().toISOString().split('T')[0],
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    userID: ''
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.taskService.getAllTasks().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.applyFilters();
      },
      error: (error) => console.error('Error loading todos:', error)
    });
  }

  onCreateTodo() {
    if (!this.newTodo.description.trim()) {
      alert('Please enter a todo description');
      return;
    }

    if (!this.newTodo.userID.trim()) {
      alert('Please enter a User ID');
      return;
    }

    this.taskService.createTask(this.newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
        this.applyFilters();
        this.resetForm();
      },
      error: (error) => console.error('Error creating todo:', error)
    });
  }

  onStatusChange(todoId: string, newStatus: ToDo['status']) {
    // Convert string ID to number for the service (adjust service if needed)
    const id = Number(todoId);
    this.taskService.updateTaskStatus(id, newStatus).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex(t => t.id === todoId);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => console.error('Error updating todo status:', error)
    });
  }

  onDeleteTodo(todoId: string) {
    if (confirm('Are you sure you want to delete this todo?')) {
      // Convert string ID to number for the service (adjust service if needed)
      const id = Number(todoId);
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(t => t.id !== todoId);
          this.applyFilters();
        },
        error: (error) => console.error('Error deleting todo:', error)
      });
    }
  }

  applyFilters() {
    this.filteredTodos = this.todos.filter(todo => {
      const statusMatch = !this.statusFilter || todo.status === this.statusFilter;
      const priorityMatch = !this.priorityFilter || todo.priority === this.priorityFilter;
      const userMatch = !this.userFilter || 
        todo.userID.toLowerCase().includes(this.userFilter.toLowerCase());
      return statusMatch && priorityMatch && userMatch;
    });
  }

  resetForm() {
    this.newTodo = {
      description: '',
      status: 'PENDING',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      userID: ''
    };
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Helper method to get todos by user
  getTodosByUser(userId: string): ToDo[] {
    return this.todos.filter(todo => todo.userID === userId);
  }
}