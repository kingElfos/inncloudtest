import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './services/project.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectsRoutingModule } from './routing/projects-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HttpErrorHandlerService } from '../shared/services/http-error-handler.service';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    PrimengModule
  ],
  providers: [HttpErrorHandlerService,ProjectService]
})
export class ProjectsModule {}
