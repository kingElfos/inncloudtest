import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.model';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@root/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;
  public projects$ = new BehaviorSubject<ProjectI[]>([]);
  public isLoading$ = new BehaviorSubject<boolean>(false);
  private errorHandler = inject(HttpErrorHandlerService);
  private http = inject(HttpClient);

  

  
  public get(): Observable<ProjectI[]> {
    return this.http.get<ProjectI[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of([]);
      }),
    );
  }

  public post(project: ProjectI) {
    return this.http.post<ProjectI | null>(this.apiUrl,project).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of(null);
      }),
    );
  }

  public put(id: string, project: ProjectI) {
    return this.http.put<ProjectI | null>(`${environment.apiUrl}/${id}`,project).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of(null);
      }),
    );
  }

  public delete(id: string) {
    return this.http.delete<ProjectI | null>(`${environment.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of(null);
      }),
    );
  }

  public getById(id: string) {
   return this.http.get<ProjectI | null>(`${environment.apiUrl}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of(null);
      }),
    );
  }
}
