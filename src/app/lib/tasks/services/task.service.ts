import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  getTasks(projectId: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      map((todos: Todo[]) => todos.filter(todo => todo.userId === projectId))
    );
  }
}
