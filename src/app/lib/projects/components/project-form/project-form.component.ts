import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent implements OnInit {
  @Input() project: any;
  @Output() saveProject = new EventEmitter<any>();
  private fb=inject(FormBuilder);
  protected projectForm!: FormGroup;


  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: [this.project?.title || '', Validators.required],
      description: [this.project?.description || '']
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.saveProject.emit(this.projectForm.value);
    }
  }
}
