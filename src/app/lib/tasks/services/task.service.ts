import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, of , BehaviorSubject, Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  public tasks$ = new BehaviorSubject < Task[] > ([]);
  private errorHandler = inject(HttpErrorHandlerService);
  private http = inject(HttpClient);

  constructor() {
    this.load();
  }

  get isbrowser() {
    return typeof window !== 'undefined'
  }

  private load() {
    //thats's  for preserve data and can look changes on the tasks and not overwrite
    //with the data of the API
    if (this.isbrowser) {
      const localTasks = localStorage.getItem('tasks');
      if (localtasks) {
        this.tasks$.next(JSON.parse(localTasks))
      } else {
        this.get().pipe((
            tap((pr) => this.setLstasks(pr))))
          .subscribe({
            next: (tasks) => this.tasks$.next(tasks),
            error: (error) => this.errorHandler.handleError(error)
          });
      }
    }

  }




  public get(): Observable < Task[] > {
    return this.http.get < Task[] > (this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of([])
      })
    );
  }

  public insert(task: Task) {
    const tasks = this.tasks$.value;
    tasks.unshift(task)
    this.update(tasks)
  }

  public put(id: string, task: Task) {
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

  private update(tasks: Task[]) {
    this.tasks$.next(tasks);
    this.setLstasks(tasks);
  }

  private setLstasks(tasks: Task[]) {
    if (this.isbrowser) {
      localStorage.setItem("tasks", JSON.stringify(tasks))
    }
  }


}
