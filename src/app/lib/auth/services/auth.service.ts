import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

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
