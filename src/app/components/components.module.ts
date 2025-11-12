import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoCard } from '../shared/todo';
import { TaskListComponent } from './task-list/task-list.component';
import { NavbarComponent } from '../navbar/navbar.component';



@NgModule({
  declarations: [
    AuthenticationComponent,
    DashboardComponent,
    TaskFormComponent,
    TodoCard,
    TaskListComponent,
  
  ],
  imports: [
    CommonModule,
    FormsModule,        
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
