
import {Injectable} from '@angular/core';
import { AuthGateway } from '@core/domain/auth/gateways/auth-gateway';
import { User } from '@core/domain/auth/models/user.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginUserUseCase {
  constructor(private authGateway: AuthGateway) {}

  login(email: string, password: string): Observable<User> {
    return this.authGateway.login(email, password);
  }
}
