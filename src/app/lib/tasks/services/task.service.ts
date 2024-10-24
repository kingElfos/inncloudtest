import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of , BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.model';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  public tasks$ = new BehaviorSubject < TaskI[] > ([]);
  private errorHandler = inject(HttpErrorHandlerService);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);



  get isbrowser() {
    return typeof window !== 'undefined'
  }

  public load(taskId:string) {
    //thats's  for preserve data and can look changes on the tasks and not overwrite
    //with the data of the API
    //the data api only is charged when is the first session

    if (this.isbrowser) {
      const localTasks = localStorage.getItem('tasks');
      if (!localTasks) {
        this.getAllTasks().subscribe((tasks) => {
          this.setLstasks(tasks)
        })
      } else {
        const taskFiltered=this.get(taskId);
        this.tasks$.next(taskFiltered);
        
      }
    }

  }




  get(projectId: string): TaskI[] {
    if (this.isbrowser) {
      const tasksLocal = localStorage.getItem("tasks");
      if (tasksLocal) {
        const tasks = JSON.parse(tasksLocal);
        return tasks.filter((tsk:TaskI) => tsk.id == projectId);
      }

    }

    return [];
  }

  getAllTasks(): Observable < TaskI[] > {
    return this.http.get < TaskI[] > (this.apiUrl);
  }
  public insert(task: TaskI) {
    const tasks = this.tasks$.value;
    tasks.unshift(task)
    this.update(tasks)
  }

  public put(id: string, task: TaskI) {
    const tasks = this.tasks$.value;
    const index = tasks.findIndex((pr) => pr.id == id);
    if (index !== -1) {
      tasks[index] = task;
      this.update(tasks)
    }
  }
  public delete(id: string) {
    const tasks = this.tasks$.value;
    const updatedtasks = tasks.filter((task) => task.id !== id);
    this.update(updatedtasks);
  }

  public getById(id: string) {
    const tasks = this.tasks$.value;
    return tasks.find((task) => task.id == id);
  }

  private update(tasks: TaskI[]) {
    this.tasks$.next(tasks);
    this.setLstasks(tasks);
  }

  private setLstasks(tasks: TaskI[]) {
    if (this.isbrowser) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }


}
