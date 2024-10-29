import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from '../primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TasksRoutingModule } from './routing/tasks-routing.module';
import { HttpErrorService } from '@shared/services/http-errors.service';
import { FormsModule } from '@angular/forms';
import { TaskService } from './services/task.service';
import { SkeletonComponent } from '@shared/components/skeleton/skeleton.component';
@NgModule({
  declarations: [TaskListComponent, TaskFormComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PrimengModule,
    SkeletonComponent
  ],
  providers: [HttpErrorService, TaskService],
})
export class TasksModule {}
