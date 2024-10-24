import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
interface Project {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  protected projects: Project[] = [];
  protected projectService=inject(ProjectService);
  protected router=inject(Router);
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email
      }));
    });
  }

  viewTasks(projectId: number) {

    console.log(projectId)
    this.router.navigate(['/tasks', projectId]);
  }
}
