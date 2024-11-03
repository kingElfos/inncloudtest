import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthGateway } from '@core/domain/auth/gateways/auth-gateway';
import { User } from '@core/domain/auth/models/user.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AuthGateway {
  private apiUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}
