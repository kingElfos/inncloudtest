import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '@tasks/services/task.service';
import { TaskI } from '@tasks/models/task.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected taskService = inject(TaskService);
  private messageService = inject(MessageService);
  protected taskForm!: FormGroup;
  private projectId!: string;
  protected taskId!: string;

  

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    this.taskId = this.route.snapshot.paramMap.get('taskId')!;
    this.initForm();
    if (this.taskId && this.projectId) {
      this.loadForm();
    }
  }

  initForm() {
    this.taskForm = this.fb.group({
      id:[null],
      project_id: [this.projectId],
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
    });
  }

  loadForm() {
    this.taskService.getById(this.taskId)
    .subscribe((task: TaskI) => {
      console.log(task)
      if(task){
        this.taskForm.patchValue({
          id:task.id,
          title:task.title,
          description:task.description,
          completed:task.completed===1
        })
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task = this.taskForm.value;
      if (this.taskId && this.projectId) {
        this.taskService.put(task)
        .subscribe((task: TaskI) => task && this.showMessage('Tarea editada'));
      } else {
        this.taskService.post(task)
        .subscribe((task: TaskI) => task && this.showMessage('Tarea creada'));
      }
    }
  }
  showMessage(
    message: string,
    summary = 'Operación exitosa',
    severity = 'success',
  ) {
    this.messageService.add({
      severity,
      summary,
      detail: message,
      life: 1500,
    });
    this.router.navigateByUrl(`/tasks/list/${this.projectId}`);
  }
}
