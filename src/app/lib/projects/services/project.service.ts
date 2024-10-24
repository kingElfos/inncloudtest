import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError} from 'rxjs/operators';
import { throwError,of } from 'rxjs';
import { HttpErrorHandlerService } from '../../shared/services/http-error-handler.service';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  description:string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  private errorHandler=inject(HttpErrorHandlerService);
  private http=inject(HttpClient);
  

  getProjects() {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        return of([])
      })
    );
  }
}
