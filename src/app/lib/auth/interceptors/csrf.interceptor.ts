import { HttpInterceptorFn,HttpResponse } from '@angular/common/http';
import {tap} from 'rxjs/operators';

let csrfToken: string | null;

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {


 

  // Envía la solicitud (modificada o original)
  return next(req);
};
