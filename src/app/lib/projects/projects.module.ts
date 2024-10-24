import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './services/project.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsRoutingModule } from './routing/projects-routing.module';
import { PrimengModule } from '../primeng/primeng.module';


@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    PrimengModule
  ],
  providers: [ProjectService]
})
export class ProjectsModule {}
