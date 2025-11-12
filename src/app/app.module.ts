import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './services/task.service';

// NgRx imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './store/reducers/auth.reducers';
import { taskReducer } from './store/reducers/task.reducers';
import { TaskEffects } from './store/effects/task.effects';
import { AuthEffects } from './store/effects/auth.effects';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditTaskModalComponent } from './components/task-edit/task-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EditTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      auth: authReducer,
      tasks: taskReducer
    }),
    EffectsModule.forRoot([TaskEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }