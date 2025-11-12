import { Component, Input } from "@angular/core";
import { ToDo } from "../models/models";
import { Store } from "@ngrx/store";
import * as TaskActions from '../store/actions/task.actions';

@Component({
  selector: "todo-card",
  styleUrls: ['./todo.css'],
  template: `
    <div *ngFor="let task of todos" class="todo-card">
      <div class="todo-main">
        <div class="todo-checkbox">
          <input type="checkbox" id="todo-check" class="checkbox" />
        </div>

        <div class="todo-content">
          <div class="todo-header">
            <h3 class="todo-title">{{task.title}}</h3>
            <span class="priority-badge priority-high">{{task.priority}}</span>
            <span class="status-badge status-pending">Pending</span>
          </div>
          <p class="todo-description">
            {{task.description}}
          </p>
          <div class="todo-meta">
            <span class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Due:{{task.dueDate}}
            </span>
            <span class="meta-item">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Created: {{task.createdAt}}
            </span>
          </div>
        </div>
      </div>

      <div class="todo-actions">
        <button (click)="markToDoCompleted(task.id)" class="btn btn-done" title="Mark as done">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Completed
        </button>
        <button (click)="updateToDo(task.id)" class="btn btn-edit" title="Edit">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            ></path>
            <path
              d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
            ></path>
          </svg>
          Edit
        </button>
        <button (click)="deleteToDo(task.id)" class="btn btn-delete" title="Delete">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
          </svg>
          Delete
        </button>
      </div>
    </div>
    `
})
export class TodoCard {
    @Input() todos : ToDo[] = [];

    constructor(private store: Store){}

    deleteToDo(taskId: string) {
      this.store.dispatch(TaskActions.deleteCurrentUserTask({ id: taskId }));
    }

    markToDoCompleted(taskId: string) {

    }

    updateToDo(taskId: string) {

    }
}
