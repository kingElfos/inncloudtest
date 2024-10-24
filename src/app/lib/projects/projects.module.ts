import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { ProjectListComponent } from './components/project-list/project-list.component';
import {ProjectFormComponent} from './components/project-form/project-form.component';
import { ProjectsRoutingModule } from './routing/projects-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { HttpErrorHandlerService } from '../shared/services/http-error-handler.service';


@NgModule({
  declarations: [ProjectListComponent,ProjectFormComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    PrimengModule
  ],
  providers: [HttpErrorHandlerService,ProjectService]
})
export class ProjectsModule {}
