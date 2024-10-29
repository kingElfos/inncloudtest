import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '@tasks/services/task.service';
import { TaskI } from '@tasks/models/task.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public projectId!: string;
  public tasks$: Observable<TaskI[]>;
  public isLoading$: Observable<boolean>;

  constructor() {
    this.tasks$ = this.taskService.tasks$;
    this.isLoading$ = this.taskService.isLoading$;
  }

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.projectId = projectId;
    this.taskService.loadTasks(projectId);
  }

  confirmDelete(id: string) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.delete(id).subscribe((task: TaskI) => {
          this.taskService.loadTasks(this.projectId);
          this.messageService.add({
            severity: 'success',
            summary: 'Eliminado',
            detail: 'El tarea fue eliminada con éxito',
          });
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

  updateTaskStatus(task: TaskI) {
    this.taskService.put(task).subscribe((task: TaskI) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Estado',
        detail: `La tarea cambió de estado a ${task.completed ? 'completada' : 'pendiente'}`,
      });
    });
  }
}
