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
  private projectId!: string;



  get isbrowser() {
    return typeof window !== 'undefined'
  }

  public load(projectId: string) {
    //thats's  for preserve data and can look changes on the tasks and not overwrite
    //with the data of the API
    //the data api only is charged when is the first session

    this.projectId = projectId;

    if (this.isbrowser) {
      const localTasks = localStorage.getItem('tasks');
      if (!localTasks) {
        this.getAllTasks().subscribe((tasks) => {
          this.setLstasks(tasks)
        })
      } else {
        this.getTasksFiltered();
      }
    }

  }

  getTasksFiltered() {
    const tasks = this.getTasksLs().filter((tsk: TaskI) => tsk.id == this.projectId);
    this.tasks$.next(tasks);
  }

  getAllTasks(): Observable < TaskI[] > {
    return this.http.get < TaskI[] > (this.apiUrl);
  }

  public insert(task: TaskI) {
    const tasks = this.getTasksLs();
    tasks.unshift(task)
    this.updateTasksLs(tasks);
  }

  public put(id: string, task: TaskI) {
    const tasks = this.getTasksLs();
    const index = tasks.findIndex((tsk: TaskI) => tsk.id == id);
    if (index !== -1) {
      tasks[index] = task;
      this.updateTasksLs(tasks);
    }
  }

  // delete task on local storage
  public delete(id: string) {
    const tasks = this.getTasksLs();
    const updatedtasks = tasks.filter((task:TaskI) => task.id !== id);
    this.updateTasksLs(updatedtasks);
  }

  //methods for handle tasks in the localstorage

  //get all tasks local storage
  public getTasksLs() {
    if (this.isbrowser) {
      const tasksLocal = localStorage.getItem("tasks");
      if (tasksLocal) {
        return JSON.parse(tasksLocal);
      }
    }
    return [];
  }

  //assign tasks on local storage

  private setLstasks(tasks: TaskI[]) {
    if (this.isbrowser) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }

  //update tasks on local storage

  public updateTasksLs(tasks: TaskI[]) {
    if (this.isbrowser) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      this.getTasksFiltered();
    }
  }


  //get task by id on the local storage
  public getById(id: string) {
    const tasks = this.getTasksLs();
    return tasks.find((task:TaskI) => task.id == id);
  }

}
