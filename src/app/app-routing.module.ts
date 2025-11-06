import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';



const routes: Routes = [
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationComponent] },
  { path: 'dashboard', component: DashboardComponent },
  {path: 'auth', component: AuthenticationComponent},
  { path: '**', redirectTo: '/auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
