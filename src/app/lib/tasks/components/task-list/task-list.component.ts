import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  protected tasks: Task[] = [];
  protected route=inject(ActivatedRoute);
  protected taskService=inject(TaskService)


  ngOnInit(): void {
    const projectId = +this.route.snapshot.paramMap.get('projectId')!;
    this.taskService.getTasks(projectId).subscribe((data) => {
      this.tasks = data;
    });
  }


  updateTaskStatus(task: Task) {
  
    console.log(`Tarea ${task.id} actualizada:`, task.completed);
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    console.log(`Tarea con ID ${taskId} eliminada.`);
  }
}
