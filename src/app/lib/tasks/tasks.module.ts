import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrimengModule} from '../primeng/primeng.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TasksRoutingModule } from './routing/tasks-routing.module';


@NgModule({
  declarations: [TaskListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
    PrimengModule
  ]
})
export class TasksModule { }