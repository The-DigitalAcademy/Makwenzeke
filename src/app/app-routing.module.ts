import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { toDoAppGuard } from './guards/auth.guard';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EditTaskModalComponent } from './components/task-edit/task-edit.component';



const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [toDoAppGuard] },
  { path: 'auth', component: AuthenticationComponent},
  { path: 'tasks', component: TaskFormComponent},
  { path: 'task-list', component: TaskListComponent},
  { path: '**', redirectTo: '/auth'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
