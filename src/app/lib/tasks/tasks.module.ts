import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimengModule} from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksRoutingModule } from './routing/tasks-routing.module';
import { HttpErrorHandlerService } from '../shared/services/http-error-handler.service';
import { FormsModule} from '@angular/forms';
import {TaskService} from './services/task.service';

@NgModule({
  declarations: [TaskListComponent,TaskFormComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule
  ],
  providers:[HttpErrorHandlerService,TaskService]
})
export class TasksModule { }
