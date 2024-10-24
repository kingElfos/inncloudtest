import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectI } from '../../models/project.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent {
  private projectService = inject(ProjectService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  protected projects$: BehaviorSubject<ProjectI[]> =
    this.projectService.projects$;
  protected isLoading$: BehaviorSubject<boolean> =
    this.projectService.isLoading$;

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este proyecto?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.projectService.delete(id);
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'El proyecto fue eliminado con éxito',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'La eliminación fue cancelada',
        });
      },
    });
  }
}
