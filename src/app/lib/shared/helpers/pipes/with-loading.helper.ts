import { finalize, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';

export function withLoading<T>(
  loadingSubject: BehaviorSubject<boolean>,
  errorHandler: ErrorHandler,
  errorResponse: any,
) {
  loadingSubject.next(true)
  return (source: Observable<T>) =>
    source.pipe(
      finalize(() => loadingSubject.next(false)),
      catchError((error: HttpErrorResponse) => {
        errorHandler.handleError(error);
        return of(errorResponse);
      }),
    );
}
