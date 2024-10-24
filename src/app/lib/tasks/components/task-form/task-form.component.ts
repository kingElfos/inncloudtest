import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskI } from '../../models/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected taskService = inject(TaskService);
  private messageService = inject(MessageService);
  protected taskForm!: FormGroup;
  protected isEdit: boolean = false;
  private projectId!: string;
  private taskId!: string;

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskId = this.route.snapshot.paramMap.get('taskId')!;
    console.log(this.taskId, this.projectId)
    if (this.projectId && this.taskId) {
      this.isEdit = true;
      const task = this.taskService.getById(this.taskId);
      this.initForm(task);
    } else {
      this.initForm();
    }

  }


  initForm(task?: TaskI) {
    this.taskForm = this.fb.group({
      id: [this.projectId],
      taskId: [task?.taskId || crypto.randomUUID()],
      title: [task?.title || '', Validators.required],
      completed: [task?.completed || false],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.isEdit) {
        this.taskService.put(this.taskId, task);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Tarea actualizada',
          life: 1500
        });
      } else {
        this.taskService.insert(task);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Tarea creada',
          life: 1500
        });
      }


      setTimeout(() => {
        this.router.navigate([`/tasks/list/${this.projectId}`]);
      }, 1500);
    }
  }
}
