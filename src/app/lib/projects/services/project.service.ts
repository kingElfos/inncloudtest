import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { ProjectI } from '../models/project.model';
import { of, BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  public projects$ = new BehaviorSubject<ProjectI[]>([]);
  public isLoading$ = new BehaviorSubject<boolean>(false);
  private errorHandler = inject(HttpErrorHandlerService);
  private http = inject(HttpClient);

  constructor() {
    this.load();
  }

  get isbrowser() {
    return typeof window !== 'undefined';
  }

  private load() {
    //thats's  for preserve data and can look changes on the projects and not overwrite
    //with the data of the API
    if (this.isbrowser) {
      const localProjects = localStorage.getItem('projects');
      if (localProjects) {
        this.projects$.next(JSON.parse(localProjects));
      } else {
        this.isLoading$.next(true);
        this.get()
          .pipe(
            tap((pr) => this.setLsProjects(pr)),
            finalize(() => this.isLoading$.next(false)),
          )
          .subscribe({
            next: (projects) => this.projects$.next(projects),
            error: (error) => this.errorHandler.handleError(error),
          });
      }
    }
  }

  public get(): Observable<ProjectI[]> {
    return this.http.get<ProjectI[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of([]);
      }),
    );
  }

  public insert(project: ProjectI) {
    const projects = this.projects$.value;
    projects.unshift(project);
    this.update(projects);
  }

  public put(id: string, project: ProjectI) {
    const projects = this.projects$.value;
    const index = projects.findIndex((pr) => pr.id == id);
    if (index !== -1) {
      projects[index] = project;
      this.update(projects);
    }
  }
  public delete(id: string) {
    const projects = this.projects$.value;
    const updatedProjects = projects.filter((project) => project.id !== id);
    this.update(updatedProjects);
  }

  public getById(id: string) {
    const projects = this.projects$.value;
    return projects.find((project) => project.id == id);
  }

  private update(projects: ProjectI[]) {
    this.projects$.next(projects);
    this.setLsProjects(projects);
  }

  private setLsProjects(projects: ProjectI[]) {
    if (this.isbrowser) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }
}
