import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TaskI } from '@tasks/models/task.model';
import { environment } from '@root/environments/environment';
import { withLoading } from '@shared/helpers/pipes/with-loading.helper';
import { HttpErrorService } from '@shared/services/http-errors.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  private tasksSubject = new BehaviorSubject<TaskI[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public tasks$ = this.tasksSubject.asObservable();
  public isLoading$ = this.loadingSubject.asObservable();
  private errorHandler = inject(HttpErrorService);
  private http = inject(HttpClient);

  public getTasksByProject(projectId: string){
    return this.http
      .get<TaskI[]>(`${this.apiUrl}/getTasksByProject/${projectId}`)
      .pipe(
        map((tasks)=>{
          return tasks.map((task)=>{
            task.completed=task.completed===1;
            return task;
          })
        }),
        withLoading(this.loadingSubject, this.errorHandler, [])
        );
  }

  public post(task: TaskI) {
    return this.http
      .post<TaskI>(this.apiUrl, task)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public put(task: TaskI) {
    return this.http
      .put<TaskI>(`${this.apiUrl}/${task.id}`, task)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public delete(id: string) {
    return this.http
      .delete<TaskI>(`${this.apiUrl}/${id}`)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public getById(id: string) {
    
    return this.http
      .get<TaskI>(`${this.apiUrl}/${id}`)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public loadTasks(projectId: string): void {
    this.getTasksByProject(projectId).subscribe((tasks: TaskI[]) =>
      this.tasksSubject.next(tasks),
    );
  }
}
