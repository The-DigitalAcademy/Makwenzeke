import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskManagerComponent } from './task-manager/task-manager.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    DashboardComponent,
    TaskManagerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
