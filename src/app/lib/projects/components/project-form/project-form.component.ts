import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '@projects/services/project.service';
import { ProjectI } from '@projects/models/project.model';

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
  protected projectId!: string;

  ngOnInit(): void {
    this.initForm();
    this.projectId = this.route.snapshot.paramMap.get('id')!;
    if (this.projectId) {
      this.loadForm();
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadForm() {
    this.projectService
      .getById(this.projectId)
      .subscribe((project: ProjectI) => {
        this.projectForm.patchValue({
          id: project.id,
          name: project.name,
          description: project.description,
        });
      });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      if (this.projectId) {
        this.projectService
          .put(this.projectId, project)
          .subscribe(
            (project: ProjectI) =>
              project && this.showMessage('Proyecto editado'),
          );
      } else {
        this.projectService
          .post(project)
          .subscribe(
            (project: ProjectI) =>
              project && this.showMessage('Proyecto creado'),
          );
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
    this.router.navigate(['/projects/list']);
  }
}
