import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';

interface Project {
  id: number;
  name: string;
  email: string;
  description:string
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  protected projects: Project[] = [];
  protected projectService = inject(ProjectService);
  protected router = inject(Router);
  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
      },
      (error) => {
        console.error('Error al cargar los proyectos:', error);
      }
    );
  }

  editProject(projectId: number) {
    // Lógica para editar el proyecto seleccionado
  }

  addProject() {
    // Lógica para añadir un nuevo proyecto
  }



  viewTasks(projectId: number) {
    this.router.navigate(['/tasks', projectId]);
  }
}
