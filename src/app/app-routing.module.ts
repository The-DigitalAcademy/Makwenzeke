import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskFormComponent } from './components/task-form/task-form.component';



const routes: Routes = [
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationComponent] },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'auth', component: AuthenticationComponent},
  { path: '**', redirectTo: '/auth' },
  { path: 'task-form', component: TaskFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
