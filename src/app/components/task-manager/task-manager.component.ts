import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { ToDo } from '../../models/todo.models';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
  todos: ToDo[] = [];
  filteredTodos: ToDo[] = [];
  
  statusFilter: string = '';
  priorityFilter: string = '';
  userFilter: string = '';

  // User mapping for display
  userMap: { [key: string]: string } = {
    'a3f2c8e1-4b6d-4c9a-8f2e-1d3b5c7a9e0f': 'Musa_Gumede',
    'b7d4e9f2-3c5a-4d8b-9e1f-2a4c6d8b0e1a': 'Nomthi',
    'c1e5a3b7-2d4f-4a9c-8e0b-3f5d7c9a1e2b': 'BongaG'
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

  onTaskCreated(newTask: ToDo) {
    this.todos.push(newTask);
    this.applyFilters();
  }

  onFormClosed() {
    // Optional: Handle form close if needed
  }

  // Add these filter change methods
  onStatusFilterChange(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  onPriorityFilterChange(priority: string) {
    this.priorityFilter = priority;
    this.applyFilters();
  }

  onUserFilterChange(user: string) {
    this.userFilter = user;
    this.applyFilters();
  }

  onStatusChange(todoId: string, newStatus: ToDo['status']) {
    this.taskService.updateTaskStatus(todoId, newStatus).subscribe({
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
      this.taskService.deleteTask(todoId).subscribe({
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
        this.getUserName(todo.userID).toLowerCase().includes(this.userFilter.toLowerCase());
      return statusMatch && priorityMatch && userMatch;
    });
  }

  getUserName(userId: string): string {
    return this.userMap[userId] || userId;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}