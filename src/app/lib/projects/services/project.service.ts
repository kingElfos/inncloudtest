import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import {ProjectI} from '../models/project.model';
import { throwError,of,BehaviorSubject,Observable } from 'rxjs';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';



@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public projects$= new BehaviorSubject<ProjectI[]>([]);
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private errorHandler=inject(HttpErrorHandlerService);
  private http=inject(HttpClient);

  constructor(){
     this.loadProjects();
  }

  private loadProjects() {
    this.getProjects().subscribe({
      next: (projects) => this.projects$.next(projects),
      error: (error) => this.errorHandler.handleError(error)
    });
  }
  

  getProjects():Observable<ProjectI[]>{
    return this.http.get<ProjectI[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of([])
      })
    );
  }
}
