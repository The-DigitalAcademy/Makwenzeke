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
  // Emitters allow parent components to listen for events
  // - taskCreated emits the new task after successful creation
  // - formClosed tells the parent that the form was closed
  @Output() taskCreated = new EventEmitter<ToDo>();
  @Output() formClosed = new EventEmitter<void>();

  // Reactive form instance
  taskForm!: FormGroup;

  // UI control flags
  isSubmitting = false;
  showForm = false;

  /** Dropdown options for Status, Priority, and Users **/
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

  // In a real app, you'd probably fetch these from a backend or database.
  userOptions = [
    { id: 'a3f2c8e1-4b6d-4c9a-8f2e-1d3b5c7a9e0f', name: 'Musa_Gumede' },
    { id: 'b7d4e9f2-3c5a-4d8b-9e1f-2a4c6d8b0e1a', name: 'Nomthi' },
    { id: 'c1e5a3b7-2d4f-4a9c-8e0b-3f5d7c9a1e2b', name: 'BongaG' }
  ];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // Initialize form when component loads
    this.taskForm = this.createForm();
  }

  /** 
   * Creates and returns a new FormGroup.
   * Validators are used to enforce rules like required fields and length.
   */
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

  /** 
   * Toggles visibility of the form (e.g., when clicking "Add Task" or "Cancel").
   * Emits formClosed when hidden to notify parent components.
   */
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.formClosed.emit();
    }
  }

  /**
   * Submits the form data to the backend via the TaskService.
   * Prevents duplicate submissions and handles success/error feedback.
   */
  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = this.taskForm.value;

    // Prepare object that matches backend schema
    const taskData: ToDoData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      userID: formData.userId,
      date: new Date().toISOString().split('T')[0],
      completed: false
    };

    // Send data to service
    this.taskService.createTask(taskData).subscribe({
      next: (newTask) => {
        this.isSubmitting = false;
        this.taskCreated.emit(newTask); // notify parent
        this.resetForm();
        this.showForm = false;
        alert('✅ Task created successfully!');
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error creating task:', error);
        alert('❌ Error creating task. Please try again.');
      }
    });
  }

  /** Reset all fields to default values **/
  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      dueDate: '',
      userId: ''
    });
  }

  /** Cancels the form and notifies parent **/
  onCancel(): void {
    this.resetForm();
    this.showForm = false;
    this.formClosed.emit();
  }

  /** Mark all fields as touched so validation messages appear **/
  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach(key => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  /** Validation helper: returns true if a field has errors **/
  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  /** Returns appropriate validation error messages **/
  getFieldError(fieldName: string): string {
    const field = this.taskForm.get(fieldName);
    if (!field?.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['minlength'])
      return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['maxlength'])
      return `Maximum length is ${field.errors['maxlength'].requiredLength} characters`;

    return '';
  }

  /** Sets the minimum allowed date for Due Date (today) **/
  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}

