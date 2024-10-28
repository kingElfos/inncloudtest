import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from '../components/project-list/project-list.component';
import { ProjectFormComponent } from '../components/project-form/project-form.component';
const routes: Routes = [
  { path: 'list', component: ProjectListComponent },
  { path: 'newproject', component: ProjectFormComponent },
  { path: 'editproject/:id', component: ProjectFormComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
