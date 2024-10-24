import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
