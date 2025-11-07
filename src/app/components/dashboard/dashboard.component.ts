import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ToDo } from 'src/app/models/models';
import * as TaskActions from '../../store/actions/task.actions';
import { selectAllTasks, selectTasksLoading } from '../../store/selectors/task.selectors';
import { selectCurrentUser } from '../../store/selectors/auth.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tasks$: Observable<ToDo[]>;
  loading$: Observable<boolean>;
  userName = '';
  
  // Computed stats
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  tasksToday = 0;
  
  // Filtered tasks
  displayedTasks: ToDo[] = [];
  activeFilter: 'all' | 'important' | 'today' | 'upcoming' | 'completed' = 'all';
  
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTasksLoading);
  }

  ngOnInit(): void {
    // Load user info
    this.store.select(selectCurrentUser).pipe(
      takeUntil(this.destroy$)
    ).subscribe(user => {
      if (user) {
        this.userName = user.name;
        this.store.dispatch(TaskActions.loadTasks({ userId: user.id }));
      }
    });

    // Subscribe to tasks and calculate stats
    this.tasks$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(tasks => {
      this.totalTasks = tasks.length;
      this.completedTasks = tasks.filter(t => t.completed).length;
      this.pendingTasks = tasks.filter(t => !t.completed).length;
      this.tasksToday = this.getTasksToday(tasks).length;
      
      this.filterTasks(tasks);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filterTasks(tasks:ToDo[]): void {
    switch (this.activeFilter) {
      case 'all':
        this.displayedTasks = tasks;
        break;
      case 'important':
        // For now, show incomplete tasks as "important"
        this.displayedTasks = tasks.filter(t => !t.completed);
        break;
      case 'today':
        this.displayedTasks = this.getTasksToday(tasks);
        break;
      case 'upcoming':
        this.displayedTasks = this.getUpcomingTasks(tasks);
        break;
      case 'completed':
        this.displayedTasks = tasks.filter(t => t.completed);
        break;
    }
  }

  setFilter(filter: 'all' | 'important' | 'today' | 'upcoming' | 'completed'): void {
    this.activeFilter = filter;
    this.tasks$.pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      this.filterTasks(tasks);
    }).unsubscribe();
  }

  getTasksToday(tasks: ToDo[]): ToDo[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() === today.getTime();
    });
  }

  getUpcomingTasks(tasks: ToDo[]): ToDo[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return tasks.filter(task => {
      const taskDate = new Date(task.createdAt);
      taskDate.setHours(0, 0, 0, 0);
      return taskDate.getTime() > today.getTime() && !task.completed;
    });
  }

  toggleTaskCompletion(task: ToDo): void {
    const updatedTask = { ...task, completed: !task.completed };
    this.store.dispatch(TaskActions.updateTask({ task: updatedTask }));
  }

  deleteTask(taskId: number | undefined): void {
    if (taskId && confirm('Are you sure you want to delete this task?')) {
      this.store.dispatch(TaskActions.deleteTask({ taskId }));
    }
  }

  navigateToTasks(): void {
    this.router.navigate(['/tasks']);
  }

  getPriorityClass(task: ToDo): string {
    // Simple priority logic based on completion and recency
    if (task.completed) return 'priority-low';
    
    const daysSinceCreated = Math.floor(
      (new Date().getTime() - new Date(task.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    if (daysSinceCreated > 3) return 'priority-high';
    if (daysSinceCreated > 1) return 'priority-medium';
    return 'priority-low';
  }

  getPriorityLabel(task: ToDo): string {
    const priorityClass = this.getPriorityClass(task);
    if (priorityClass === 'priority-high') return 'High';
    if (priorityClass === 'priority-medium') return 'Medium';
    return 'Low';
  }
}