import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ToDo, ToDoData } from 'src/app/models/models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<ToDo>();
  @Output() formClosed = new EventEmitter<void>();

  taskForm: FormGroup;
  isSubmitting = false;
  showForm = false;

  // Options for dropdowns
  statusOptions = [
    { value: 'todo', label: 'To Do' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' }
  ];

  // User options from your db.json
  userOptions = [
    { id: 'a3f2c8e1-4b6d-4c9a-8f2e-1d3b5c7a9e0f', name: 'Musa_Gumede' },
    { id: 'b7d4e9f2-3c5a-4d8b-9e1f-2a4c6d8b0e1a', name: 'Nomthi' },
    { id: 'c1e5a3b7-2d4f-4a9c-8e0b-3f5d7c9a1e2b', name: 'BongaG' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {
    this.taskForm = this.createForm();
  }

  ngOnInit() {}

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      status: ['todo', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required],
      userId: ['', Validators.required]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.formClosed.emit();
    }
  }

  onSubmit() {
    if (this.taskForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formData = this.taskForm.value;
      
      // Prepare the task data for submission using ToDoData type
      const taskData: ToDoData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        userID: formData.userId,
        date: formData.date || new Date().toISOString().split('T')[0] 

      };

      this.taskService.createTask(taskData).subscribe({
        next: (newTask) => {
          this.isSubmitting = false;
          this.taskCreated.emit(newTask);
          this.resetForm();
          this.showForm = false;
          
          // Show success message
          alert('Task created successfully!');
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Error creating task:', error);
          alert('Error creating task. Please try again.');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm() {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      userId: ''
    });
  }

  onCancel() {
    this.resetForm();
    this.showForm = false;
    this.formClosed.emit();
  }

  // Helper method to mark all fields as touched
  private markFormGroupTouched() {
    Object.keys(this.taskForm.controls).forEach(key => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  // Field validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `Maximum length is ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  // Get minimum date for due date (today)
  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}