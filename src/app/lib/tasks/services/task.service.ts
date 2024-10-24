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
  private route=inject(ActivatedRoute);

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
      if (localTasks) {
        this.tasks$.next(JSON.parse(localTasks))
      } else {
        const taskId = this.route.snapshot.paramMap.get('taskId')!;
        this.get(taskId).pipe((
            tap((tsk) => this.setLstasks(tsk))))
          .subscribe({
            next: (tasks) => this.tasks$.next(tasks),
            error: (error) => this.errorHandler.handleError(error)
          });
      }
    }

  }




  get(projectId: string): Observable<TaskI[]> {
    return this.http.get<TaskI[]>(this.apiUrl).pipe(
      map((todos: TaskI[]) => todos.filter(todo => todo.id == projectId))
    );
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
