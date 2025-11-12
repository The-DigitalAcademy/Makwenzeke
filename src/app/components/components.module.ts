import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoCard } from '../shared/todo';


@NgModule({
  declarations: [
    AuthenticationComponent,
    DashboardComponent,
    TaskManagerComponent,
    TaskFormComponent,
    TodoCard
  ],
  imports: [
    CommonModule,
    FormsModule,        
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
