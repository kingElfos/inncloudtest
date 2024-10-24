import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../components/task-list/task-list.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
const routes: Routes = [
  { path: 'list/:projectId', component: TaskListComponent },
  { path: 'handle/:projectId', component: TaskFormComponent },
  { path: 'handle/:projectId/:taskId', component: TaskFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TasksRoutingModule {}
