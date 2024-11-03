import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export abstract class AuthGateway {
  abstract login(email: string, password: string): Observable<User>;
  abstract logout(): Observable<void>;
}
