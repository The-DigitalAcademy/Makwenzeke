import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppUser, ToDo, ToDoData } from 'src/app/models/models';
import * as TaskActions from '../../store/actions/task.actions';
import { selectCurrentUser } from '../../store/selectors/auth.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<ToDo>();
  @Output() formClosed = new EventEmitter<void>();

  taskForm!: FormGroup;
  isSubmitting = false;
  showForm = true;
  currentUser!: AppUser;

  statusOptions = [
    { value: 'PENDING', label: 'Pending' },
    { value: 'COMPLETED', label: 'Completed' }
  ];

  priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Auto-select current user in the userId field
    this.store.select(selectCurrentUser).pipe(take(1)).subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
     this.taskForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      status: ['PENDING', Validators.required],
      priority: ['medium', Validators.required],
      dueDate: ['', Validators.required],
      userId: [this.currentUser.id, Validators.required]
    });
  }


  // not used.
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.formClosed.emit();
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;

    const formData = this.taskForm.value;

    const taskData: ToDoData = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      dueDate: formData.dueDate,
      userID: formData.userId,
      date: new Date().toISOString().split('T')[0],
      completed: formData.status === 'COMPLETED'
    };

    // Dispatch action to create task through NgRx
    this.store.dispatch(TaskActions.createTaskForCurrentUser({ 
      taskData: {
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        dueDate: taskData.dueDate,
        date: taskData.date,
        completed: taskData.completed
      }
    }));

    // Show success message and navigate
    setTimeout(() => {
      this.isSubmitting = false;
      alert('✅ Task created successfully!');
      this.resetForm();
      this.showForm = false;
      
      // Navigate to dashboard
      this.router.navigate(['/dashboard']);
    }, 500);
  }

  resetForm(): void {
    this.taskForm.reset({
      title: '',
      description: '',
      status: 'PENDING',
      priority: 'medium',
      dueDate: '',
      userId: ''
    });
    
    // Re-select current user
    this.store.select(selectCurrentUser).pipe(take(1)).subscribe(user => {
      if (user) {
        this.taskForm.patchValue({ userId: user.id });
      }
    });
  }

  onCancel(): void {
    this.resetForm();
    this.showForm = false;
    this.formClosed.emit();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach(key => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.taskForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

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

  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}