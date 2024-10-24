import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectI } from '../../models/project.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected route = inject(ActivatedRoute);
  protected router = inject(Router);
  protected projectService = inject(ProjectService);
  private messageService = inject(MessageService);
  protected projectForm!: FormGroup;
  protected isEdit = false;
  private projectId!: string;

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('projectId')!;
    if (this.projectId) {
      this.isEdit = true;
      const project = this.projectService.getById(this.projectId);
      this.initForm(project);
    } else {
      this.initForm();
    }
  }

  initForm(project?: ProjectI) {
    this.projectForm = this.fb.group({
      id: [project?.id || crypto.randomUUID()],
      name: [project?.name || '', Validators.required],
      email: [project?.email || 'bcadavid@gmail.com', Validators.email],
      description: [project?.description || ''],
      website: [project?.website || 'www.incloud.com'],
      company: [project?.company || { name: 'incloud' }],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      if (this.isEdit) {
        this.projectService.put(this.projectId, project);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Proyecto actualizado',
          life: 1500,
        });
      } else {
        this.projectService.insert(project);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación exitosa',
          detail: 'Proyecto creado',
          life: 1500,
        });
      }

      setTimeout(() => {
        this.router.navigate(['/projects/list']);
      }, 1500);
    }
  }
}
