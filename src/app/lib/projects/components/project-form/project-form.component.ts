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
    this.projectId = this.route.snapshot.paramMap.get('id') !;
    if (this.projectId) {
      this.isEdit = true;
      this.loadForm();
    } else {
      this.initForm();
    }
  }

  initForm() {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  loadForm() {
    this.projectService.getById(this.projectId).subscribe((project: ProjectI) => {
      this.projectForm = this.fb.group({
        name: [project.name, Validators.required],
        description: [project.description, Validators.required],
      });
    })
  }

  onSubmit() {
    if (this.projectForm.valid) {
      const project = this.projectForm.value;
      if (this.isEdit) {
        this.projectService.put(this.projectId, project)
        .subscribe((project: ProjectI) => this.showMessage("Proyecto editado"));
      } else {
        this.projectService.post(project)
        .subscribe((project: ProjectI) => this.showMessage("Proyecto creado"));
      }

    }
  }
  showMessage(message:string,summary="Operación exitosa",severity="success") {
    this.messageService.add({
      severity,
      summary,
      detail: message,
      life: 1500,
    });
    this.router.navigate(['/projects/list']);
  }
}
