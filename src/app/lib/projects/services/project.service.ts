import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, BehaviorSubject, Observable, tap } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ProjectI } from '@projects/models/project.model';
import { HttpErrorService } from '@shared/services/http-errors.service';
import { withLoading } from '@shared/helpers/pipes/with-loading.helper';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = `${environment.apiUrl}/projects`;
  private projectsSubject = new BehaviorSubject<ProjectI[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public projects$ = this.projectsSubject.asObservable();
  public isLoading$ = this.loadingSubject.asObservable();
  private errorHandler = inject(HttpErrorService);
  private http = inject(HttpClient);

  public get(): Observable<ProjectI[]> {
    return this.http
      .get<ProjectI[]>(this.apiUrl)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, []));
  }

  public post(project: ProjectI) {
    return this.http
      .post<ProjectI>(this.apiUrl, project)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public put(id: string, project: ProjectI) {
    return this.http
      .put<ProjectI>(`${this.apiUrl}/${id}`, project)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public delete(id: string) {
    return this.http
      .delete<ProjectI>(`${this.apiUrl}/${id}`)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public getById(id: string) {
    return this.http
      .get<ProjectI>(`${this.apiUrl}/${id}`)
      .pipe(withLoading(this.loadingSubject, this.errorHandler, null));
  }

  public loadProjects(): void {
    this.get().subscribe((projects) => this.projectsSubject.next(projects));
  }
}
