// edit-task-modal.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDo } from 'src/app/models/models';
import * as TaskActions from 'src/app/store/actions/task.actions';
import { selectEditingTask, selectIsEditModalOpen, selectTasksLoading } from 'src/app/store/selectors/task.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal',
  template: `
    <div class="modal" [class.show]="isEditModalOpen$ | async">
      <div class="modal-content">
        <h2>Edit Task</h2>
        
        <form [formGroup]="editForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="title">Title</label>
            <input 
              id="title" 
              type="text" 
              formControlName="title"
              placeholder="Task title">
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              formControlName="description"
              placeholder="Task description"
              rows="3">
            </textarea>
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" formControlName="completed">
              <option [value]="false">Pending</option>
              <option [value]="true">Completed</option>
            </select>
          </div>

          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" formControlName="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="modal-actions">
            <button 
              type="button" 
              class="btn-secondary"
              (click)="onCancel()"
              [disabled]="loading$ | async">
              Cancel
            </button>
            <button 
              type="submit" 
              class="btn-primary"
              [disabled]="editForm.invalid || (loading$ | async)">
              {{ (loading$ | async) ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styleUrls: ['./task-edit.component.css']
})
export class EditTaskModalComponent {
  @Output() closed = new EventEmitter<void>();

  editForm: FormGroup;
  isEditModalOpen$: Observable<boolean>;
  editingTask$: Observable<ToDo | null>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false],
      priority: ['medium']
    });

    this.isEditModalOpen$ = this.store.select(selectIsEditModalOpen);
    this.editingTask$ = this.store.select(selectEditingTask);
    this.loading$ = this.store.select(selectTasksLoading);

    // When editing task changes, update the form
    this.editingTask$.subscribe(task => {
      if (task) {
        this.editForm.patchValue({
          title: task.title,
          description: task.description,
          completed: task.completed,
          priority: task.priority || 'medium'
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.editingTask$.subscribe(task => {
        if (task) {
          this.store.dispatch(TaskActions.editTask({
            taskId: task.id,
            updates: this.editForm.value
          }));
        }
      });
    }
  }

  onCancel(): void {
    this.store.dispatch(TaskActions.closeEditTaskModal());
  }
}