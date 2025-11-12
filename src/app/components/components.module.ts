import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AuthenticationComponent,
    DashboardComponent,
    TaskManagerComponent,
    TaskFormComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,        
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
