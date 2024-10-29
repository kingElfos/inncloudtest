import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@root/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private http = inject(HttpClient);

  get isbrowser() {
    return typeof window !== 'undefined';
  }

  login(username: string, password: string): boolean {
    if (username === 'innclod' && password === 'somepassword') {
      this.isAuthenticated = true;
      this.isbrowser && localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    this.isbrowser && localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    if (this.isbrowser) {
      return localStorage.getItem('isAuthenticated') === 'true';
    }
    return false;
  }
}
