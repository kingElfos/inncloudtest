import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {ProjectI} from '../../models/project.model';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';

  // Crear y Editar Proyectos/Tareas: Crea formularios reactivos que permitan añadir y editar
  // proyectos/tareas. Debes incluir validaciones en los formularios:
  // ● Los títulos deben ser obligatorios.
  // ● El estado de las tareas debe representarse como un checkbox (completado o no).
  // ● Los formularios deben ser modulares y reutilizables.
  // 5. Eliminar Proyectos/Tareas con Modales: Implementa un modal para confirmar la eliminación de
  // un proyecto o tarea. Usa una librería como Angular Material o PrimeNG para gestionar los modales.
  // 


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent{
  
  protected projectService = inject(ProjectService);
  protected projects$:BehaviorSubject<ProjectI[]> = this.projectService.projects$;
  protected router = inject(Router);
  protected isLoading=false;
 
}
