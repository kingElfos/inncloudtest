import { Component, Input, Output, EventEmitter, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  @Input() task: any;
  @Output() saveTask = new EventEmitter<any>();
  private fb=inject(FormBuilder);
  protected taskForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', Validators.required],
      completed: [this.task?.completed || false]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.saveTask.emit(this.taskForm.value);
    }
  }
}
