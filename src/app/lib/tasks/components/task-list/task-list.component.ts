import { Component, inject,OnInit,AfterViewInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { BehaviorSubject} from 'rxjs';
import { TaskI } from '../../models/task.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{


  

  private taskService = inject(TaskService);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  private route=inject(ActivatedRoute);
  private router = inject(Router);
  protected tasks$: BehaviorSubject < TaskI[] > = this.taskService.tasks$;
  protected isLoading = false;


  ngOnInit(){
    const taskId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskService.load(taskId);
  }




  confirmDelete(id: string) {

    console.log(id)
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta tarea?',
      header: 'Confirmación de eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.delete(id);
        this.messageService.add({ severity: 'success', summary: 'Eliminado', detail: 'la tarea fue eliminada con éxito' });
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelado', detail: 'La eliminación fue cancelada' });
      }
    });
  }


  updateTaskStatus(task:TaskI){
    this.taskService.put(task.id, task);
  }
 


}
